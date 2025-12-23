import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchData = { from: '', to: '', date: '' };
  flights: any[] = [];

  constructor(private flightService: FlightService) {}

  onSearch() {
    this.flightService.searchFlights(this.searchData.from, this.searchData.to, this.searchData.date)
      .subscribe(data => this.flights = data);
  }
}