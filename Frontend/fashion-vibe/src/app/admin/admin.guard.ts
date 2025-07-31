import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const email = JSON.parse(atob(token!.split('.')[1])).sub;
    if (email === 'Admin@FashionVibe.com') return true;
    this.router.navigate(['/admin']);
    return false;
  }
}
