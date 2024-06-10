import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  productList: any = [];
  tempProductList: any = [];
  searchText: any = '';
  userName: string = '';
  cartItem=0;

  constructor(
    private router: Router,
    private product: ProductService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          //console.warn("In seller area")
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.userName;
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        }
      } else {
        //console.warn("Outside seller")
        this.menuType = 'default';
      }
    });


    let cartData=localStorage.getItem('localCart');
    if(cartData)
      {
        this.cartItem=JSON.parse(cartData).length
      }

      this.product.cartData.subscribe((items)=>{
        this.cartItem=items.length;
      })
  }

  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  userLogOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  userAuth() {
    this.router.navigate(['/user-auth']);
  }

  home() {
    this.router.navigate(['home']);
  }

  cartPage(){
    this.router.navigate(['/cart-page'])
  }

  myOrders(){
    this.router.navigate(['/my-orders']);
  }

  seller() {
    let seller: any = localStorage.getItem('seller');
    if (seller) this.router.navigate(['seller-home']);
    else this.router.navigate(['seller-auth']);
  }
  sellerAddProduct() {
    this.router.navigate(['seller-add-product']);
  }

  searchProduct(query: KeyboardEvent) {
    if (this.searchText) {
      this.tempProductList = [];
      // const element = query.target as HTMLInputElement;
      // this.product.searchProducts(element.value).subscribe((result) => {
      //   console.warn(result);
      // });
      this.tempProductList = this.productList.filter((item: any) =>
        item.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
      console.log(this.tempProductList);
      if (this.tempProductList.length > 5) this.tempProductList.length = 5;
    } else {
      this.tempProductList = [];
      this.fetchData();
    }
  }

  fetchData() {
    this.product.productList().subscribe((data) => {
      this.productList = data;
    });
  }

  submitSearch(val: string) {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    //console.warn(val);

    this.router.navigate([`search/${val}`]);
    this.tempProductList = [];
    this.searchText = '';
  }
  productDetails(item: any) {
    this.router.navigate([`details/${item.id}`]);
    this.searchText = '';
  }
}
