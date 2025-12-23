import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  regData = { name: '', email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    if (this.regData.email && this.regData.name) {
      localStorage.setItem('user', JSON.stringify({
        name: this.regData.name,
        email: this.regData.email
      }));
      alert('Registration Successful! Please login.');
      this.router.navigate(['/login']);
    }
  }
}