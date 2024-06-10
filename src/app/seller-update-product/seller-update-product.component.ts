import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { copyFileSync } from 'fs';
import { ProductService } from '../services/product.service';
import { subscribe } from 'diagnostics_channel';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.scss',
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute, private product: ProductService) {}
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;
      });
  }

  submit(data: product) {
    console.warn(data);
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product Updated Succesfully!!';
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
