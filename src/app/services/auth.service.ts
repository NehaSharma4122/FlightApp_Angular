import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<any>(JSON.parse(localStorage.getItem('user') || 'null'));

  constructor(private router: Router) {}

  login(email: string) {
    const user = { email, name: 'Guest User', role: 'Premium' };
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return !!this.currentUser(); }
}