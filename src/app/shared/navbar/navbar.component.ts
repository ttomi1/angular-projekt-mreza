import { Component } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private auth : AuthService) {
  }

  logout() {
    this.auth.logout();
  }
}
