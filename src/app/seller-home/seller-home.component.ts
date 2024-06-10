import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule, NgFor } from '@angular/common';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [NgFor, FontAwesomeModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss',
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined | string;
  deleteIcon = faTrash;
  editIcon = faEdit;

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id: number) {
    console.warn('test id', id);

    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product Deleted Successfully!!';
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
  list() {
    this.product.productList().subscribe((result) => {
      console.log(result);
      this.productList = result;
    });
  }

  sellerUpdateProduct(id: any) {
    this.router.navigate(['seller-update-product', id]);
  }
}
