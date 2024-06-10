import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { warn } from 'console';
import { WriteVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss',
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private product: ProductService, private router: Router) {}

  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      // console.warn(result);
      if (result) {
        this.addProductMessage = 'Product Successfully Added to List';
      }
      setTimeout(() => {
        this.addProductMessage = undefined;
      }, 3000);
    });
  }
}
