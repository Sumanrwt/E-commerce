import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { signUp } from '../data-type';
import { CommonModule } from '@angular/common';
import { isErrored } from 'stream';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss',
})
export class SellerAuthComponent {
  constructor(private seller: SellerService, private router: Router) {}
  showLogin: boolean = false;
  authError: String = '';

  signUp(data: signUp): void {
    this.seller.userSignUp(data);
  }

  login(data: signUp): void {
    this.authError = '';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Incorrect Email or Password';
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
