import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];

  constructor(private product: ProductService, private router: Router) {}
  ngOnInit() {
    this.product.popularProducts().subscribe((data) => {
      //console.warn(data);
      this.popularProducts = data;
    });

    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });
  }
  productDetails(item: any) {
    
    this.router.navigate([`details/${item.id}`]);
  }
}
