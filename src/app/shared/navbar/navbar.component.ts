import { Component } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userId: string | null = null;
  constructor(private auth : AuthService) {
  }



  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userId = user.id;
    }
  }
  logout() {
    this.auth.logout();
  }
}
