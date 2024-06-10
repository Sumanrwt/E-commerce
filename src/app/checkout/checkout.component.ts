import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { cart, order, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  totalPrice:number | undefined;
  cartData : cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private product:ProductService, private router:Router){

  }

  ngOnInit(): void
   {this.product.currentCart().subscribe((result)=>{
    let price=0;
    this.cartData=result;
    result.forEach((item)=>{
      if(item.quantity){
        price=price + (+item.price* +item.quantity);
      }
      
    });
    this.totalPrice=(price+(price/10)+100)-(price/10);
    console.warn(this.totalPrice);
    });  
   }

   orderNow(data:{email:string, address: string, mobile:string})
   {
   let user=localStorage.getItem('user');
   let userId=user && JSON.parse(user).id;

   if(this.totalPrice){
    let orderData:order={
      ...data,
      totalPrice: this.totalPrice,
      userId,
      id: undefined
    }

    this.cartData?.forEach((item)=>{
      setTimeout(() => {
        item.id && this.product.deleteCartItems(item.id)
      }, 1000);
    })
    this.product.orderNow(orderData).subscribe((result)=>{
      if(result){
        this.orderMsg="Your Order Has Been Successfully Placed!!"
        setTimeout(() => {
          this.router.navigate(['/my-orders']);
          this.orderMsg=undefined;
        }, 4000);
      }
    })
   }

   }
  

}
