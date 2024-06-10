import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth=new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(user: signUp) {
    this.http
      .post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((result) => {
        console.log(result, 'result');
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }
  userAuthReload() {
    if (localStorage.getItem('user'))
       this.router.navigate(['/']);
  }

  userLogin(data: any) {
    this.http
      .get(
        'http://localhost:3000/users?userEmail=' +
          data.userEmail +
          '&userPassword=' +
          data.userPassword,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body?.length) {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        }else{
          this.invalidUserAuth.emit(true);

        }
      });
  }
}
