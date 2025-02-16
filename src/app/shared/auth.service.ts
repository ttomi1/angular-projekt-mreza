import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiRoot ='http://localhost:8081';
  private user : any;
  constructor(private http : HttpClient, private router : Router) { }

  login(credentials : {username:string, password:string}){
    this.http.post(`${this.apiRoot}/authenticate/login`, credentials)
      .subscribe((res: any) => {
        console.log(res);
        if (res.message == "OK") {
          this.user = res.user;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.router.navigate(['/']);
        }
      });

  }
  logout(){
    this.user=null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser() {
    if (!this.user) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      } else {
        this.user = null;
      }
    }
    return this.user ? { ...this.user } : null;
  }





  isAuthenticated(){
    return this.user!=null;
  }
}
