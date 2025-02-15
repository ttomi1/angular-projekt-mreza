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

  getUser(): User | null {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      this.user = null;
    } else {
      this.user = JSON.parse(storedUser);
    }

    return this.user;
  }





  isAuthenticated(){
    return this.user!=null;
  }
}
