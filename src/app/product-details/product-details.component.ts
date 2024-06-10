import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { NgIf } from '@angular/common';
import { Location } from '@angular/common';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart=false;
  cartData:product | undefined;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    //console.log(productId,"product Id");
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        // console.log(result,"result")
        this.productData = result;

        let cartData=localStorage.getItem('localCart');
        if(productId && cartData)
          {
            let items=JSON.parse(cartData);
            items=items.filter((item:product)=>productId==item.id.toString())
            if(items.length)
              {
                this.removeCart=true;
              }
              else{
                this.removeCart=false;
              }
          }
          let user=localStorage.getItem('user');
          if(user){
            let userId=user && JSON.parse(user).id;
            this.product.getCartList(userId);
            
            this.product.cartData.subscribe((result)=>{
              let item =result.filter((item:product)=>productId?.toString()===item.productId?.toString());
            if(item.length)
              {
                this.cartData=item[0];
                this.removeCart=true;
              }
            })

          }

      });
  }
  handleQuantity(val: string) {
    if (this.productQuantity <= 19 && val === 'plus') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity--;
    } else if (this.productQuantity <= 1 && val === 'min') {
      this.location.back();
    }
  }

  addToCart(){
    if(this.productData)
      {
          this.productData.quantity=this.productQuantity;
          if(!localStorage.getItem('user')){
          this.product.localAddToCart(this.productData);
          this.removeCart=true;
        }else{
          let user=localStorage.getItem('user');
          let userId=user && JSON.parse(user).id;
          let cartData:cart={
            ...this.productData,
            userId,
            productId:this.productData.id,
          }
          delete cartData.id;
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result)
              {
               this.product.getCartList(userId);
               this.removeCart=true;
              }
          })
        }
      }
  }

  removeFromCart(productId:number){
    if(!localStorage.getItem('user')){
    this.product.removeItemFromCart(productId);
    }else if(!localStorage.getItem('default')){
      this.product.removeItemFromCart(productId);
    }else{
      let user=localStorage.getItem('user');
      let userId=user && JSON.parse(user).id;
      console.warn(this.cartData);
      this.cartData && this.product.removeFromCart(this.cartData.id)
      .subscribe((result)=>{
        if(result)
          {
            this.product.getCartList(userId)
            
          }
      })
    }
    this.removeCart=false;
  }

}

