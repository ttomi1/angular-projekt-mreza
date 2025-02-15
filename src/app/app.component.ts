import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SocialNetwork';

  showNavbar : boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showNavbar = !(this.router.url === '/login' || this.router.url === '/login/register');
    });
  }
}
