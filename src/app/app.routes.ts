import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchFlightsComponent } from './pages/search-flights/search-flights.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Luxury Landing Page
  { path: 'search', component: SearchFlightsComponent }, // Separate Search Page
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];