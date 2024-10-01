import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class NoUserGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!!token) {
      const payload = jwtDecode<{role: string}>(token);
      if (payload.role === 'client') {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/dashboard']);
      }
      return false;
    }

    return true;
  }
}
