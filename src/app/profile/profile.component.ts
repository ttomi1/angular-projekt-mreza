import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  id : string | null = null;
  isOwnProfile: boolean = false;
  showAddPost: boolean = false;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const currentUser = JSON.parse(storedUser);
        this.isOwnProfile = this.id == currentUser.id;
      }

    });
    console.log(this.id);
    console.log((this.isOwnProfile));
  }

  toggleAddPost() {
    this.showAddPost = !this.showAddPost;
  }
}
