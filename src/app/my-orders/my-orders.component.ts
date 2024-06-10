import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [NgFor],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  orderData : order[] | undefined;
  constructor(private product:ProductService, private router:Router){

  }
  
  ngOnInit(): void {
    this.getOrderList();   
  }


  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
  })
}

myOrders(){
  this.router.navigate(['/my-orders']);
}

}
