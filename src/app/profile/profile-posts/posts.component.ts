import {Component, Input} from '@angular/core';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-profile-posts',
  standalone: false,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  posts : any | null = null;
  @Input() id!: string;
  myId : string = "0";
  commentBox: { [key: number]: boolean } = {};
  commentText: { [key: number]: string } = {};
  comments: { [key: number]: any[] } = {};
  commentsVisible: { [key: number]: boolean } = {};
  constructor(private dataService : DataService) {}
  ngOnInit(){
    this.dataService.getUserPosts(this.id).subscribe(res =>{
      this.posts = res;
      console.log(this.posts);
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      this.myId = currentUser.id;
    }
    console.log("USER ID = ", this.myId);
  }

  like(postId : string){
    console.log(this.id);
    this.dataService.toggleLike(postId, this.myId).subscribe(res =>{
      console.log(res);
    });
  }

  toggleCommentBox(postId: number) {
    this.commentBox[postId] = !this.commentBox[postId];
  }

  postComment(postId: number) {
    if (!this.commentText[postId]) return;

    this.dataService.addComment(postId, this.id, this.commentText[postId]).subscribe((res) => {
      console.log("Comment posted", res);
      this.commentText[postId] = "";
      this.commentBox[postId] = false;
    });
  }

  getComments(postId: number) {
    if (this.commentsVisible[postId]) {
      this.commentsVisible[postId] = false;
    } else {
      this.dataService.fetchComments(postId).subscribe((res : any[]) => {
        this.comments[postId] = res;
        this.commentsVisible[postId] = true;
      });
    }
  }
}
