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

  getUserData(id : string){
    return this.http.get(`${this.apiRoot}/api/user/${id}`)
  }

  updateUserBio(id : string, bio: string) {
    return this.http.put(`${this.apiRoot}/api/user/${id}`, {bio});
  }

  postPost(post : {id: string, content: string, title: string}, id:string){
    return this.http.post(`${this.apiRoot}/api/users/post/${id}`, post);
  }

  getAllPosts(){
    return this.http.get(`${this.apiRoot}/api/posts`)
  }

  getUserPosts(id : string){
    return this.http.get(`${this.apiRoot}/api/users/post/${id}`);
  }

  toggleLike(postId: string, userId : string){
    return this.http.post(`${this.apiRoot}/api/like/${postId}`, {userId: userId});
  }

  addComment(postId: number, userId: string, content: string){
    return this.http.post(`${this.apiRoot}/api/comments/${postId}`, { user_id: userId, content })
  }

  fetchComments(postId : number){
    return this.http.get<any[]>(`${this.apiRoot}/api/comments/${postId}`)
  }
}
