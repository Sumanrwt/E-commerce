import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgFor,CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | any;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getCardData();
  }

  getCardData(){
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + price / 10 + 100 - price / 10;
      console.warn(this.priceSummary);
    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
  removeFromCart(cartId: any) {
    this.product.deleteProductToCart(cartId).subscribe((result) => {
      if (result) {
        alert("Product removed successfully !")
        this.getCardData();
      //  this.product.headerCardUpdate();
      }
    });
  }
}
