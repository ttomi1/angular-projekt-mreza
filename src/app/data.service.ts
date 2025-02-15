import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  apiRoot ='http://localhost:8081';

  register(userData : {username : string, password : string, email : string}){
    return this.http.post(`${this.apiRoot}/authenticate/register`, userData);
  }
}
