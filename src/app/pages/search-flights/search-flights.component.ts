import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Import DatePipe
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [CommonModule, FormsModule], // DatePipe is included in CommonModule
  templateUrl: './search-flights.component.html',
  styleUrl: './search-flights.component.css'
})
// ... imports
export class SearchFlightsComponent {
  searchData = { from: '', fromName: '', to: '', toName: '', date: '' };
  fromSuggestions: any[] = [];
  toSuggestions: any[] = [];
  flights: any[]=[];
  loading=false;
  // ... other variables

  constructor(private flightService: FlightService) {}
  onSearch() {
    this.loading = true;
    this.flightService.searchFlights(this.searchData.from, this.searchData.to, this.searchData.date)
      .subscribe({
        next: (res: any) => {
          this.flights = res.data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert("Error fetching flights.");
        }
      });
  }
  // Function called on every keystroke
  onCitySearch(event: any, type: 'from' | 'to') {
    const query = event.target.value;
    if (query.length > 0) { // Only search after 3 characters
      this.flightService.searchCities(query).subscribe(res => {
        if (type === 'from') this.fromSuggestions = res.data;
        else this.toSuggestions = res.data;
      });
    }
  }

  // When user clicks a suggestion
  selectCity(city: any, type: 'from' | 'to') {
    if (type === 'from') {
      this.searchData.from = city.iataCode;
      this.searchData.fromName = `${city.name} (${city.iataCode})`;
      this.fromSuggestions = []; // Clear dropdown
    } else {
      this.searchData.to = city.iataCode;
      this.searchData.toName = `${city.name} (${city.iataCode})`;
      this.toSuggestions = []; // Clear dropdown
    }
  }

  bookFlight(flight: any) {
    const existing = JSON.parse(localStorage.getItem('myBookings') || '[]');
    existing.push({
      id: flight.id,
      from: this.searchData.from,
      to: this.searchData.to,
      date: this.searchData.date,
      price: flight.price.total
    });
    localStorage.setItem('myBookings', JSON.stringify(existing));
    alert("Flight Booked Successfully!");
  }
}