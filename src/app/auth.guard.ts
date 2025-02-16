import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "./shared/auth.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    const user = this.authService.getUser();
    console.log('Auth Guard: User:', user);

    if (user) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
