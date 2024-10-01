import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const payload = jwtDecode<{role: string}>(token);
    if (payload.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
