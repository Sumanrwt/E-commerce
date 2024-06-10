import { Component, OnInit, booleanAttribute } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  message: boolean = false;
  [x: string]: any;
  searchResult: undefined | product[];
  productList: any = [];
  searchText: any = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    this.searchText = query;

    this.fetchData();
  }
  searchProduct(query: any) {
    if (query) {
      this.searchResult = this.productList.filter((item: any) =>
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      if (this.searchResult?.length == 0) {
        this.showMessage();
        //alert("Item Not Found");
      }
    } else {
      this.fetchData();
    }
  }

  fetchData() {
    this.product.productList().subscribe((data) => {
      this.productList = data;
      this.searchProduct(this.searchText);
    });
  }
  showMessage() {
    this.message = true;
  }
  productDetails(item: any) {
    //console.log(item,'item')
    this.router.navigate([`details/${item.id}`]);
  }

  // hideMessage() {
  //   this.message = false;
  // }
}
