import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss',
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = false;
  authError: string = '';
  cardDataList:any=[];
  constructor(private user: UserService, private product: ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data);
  }
  login(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'Please Enter Valid User Detail';
      } else {
        setTimeout(() => {
          this.localCartToRemoteCart();
        }, 4000);
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index: any) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId: userId,
        };

        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('Item Stored in DB');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId)
      // this.product.getCartList(userId).subscribe((result) => {
      //   if (result) {
      //     let cardData:any=result;
      //     this.cardDataList=cardData.filter((list:any)=>list.userId==userId);
      //     localStorage.setItem('localCart',JSON.stringify(this.cardDataList))
      //   }
      // });
    }, 500);
  }
}
