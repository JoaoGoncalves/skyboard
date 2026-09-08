import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Flight } from '../../data/flight';
import { initialAircraft } from '../../data/aircraft';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  imports: [FormField, JsonPipe, DatePipe],
  selector: 'app-flight-search',
  templateUrl: './flight-search.html',
})
export class FlightSearch {
  protected readonly filter = signal({
    from: 'Lisbon',
    to: 'Porto',
  });

  protected readonly filterForm = form(this.filter);
  protected readonly flights = signal<Flight[]>([]);
  protected readonly selectedFlight = signal<Flight | null>(null);

  protected search(): void{
    const date = new Date().toISOString();

    this.flights.set([
      {
        id: 1,
        from: this.filter().from,
        to: this.filter().to,
        date,
        delayed: false,
        delay: 0,
        aircraft: { ...initialAircraft },
        prices: [],
      },
      {
        id: 2,
        from: this.filter().from,
        to: this.filter().to,
        date,
        delayed: false,
        delay: 0,
        aircraft: { ...initialAircraft },
        prices: [],
      },
      {
        id: 3,
        from: this.filter().from,
        to: this.filter().to,
        date,
        delayed: false,
        delay: 0,
        aircraft: { ...initialAircraft },
        prices: [],
      },
    ]);
  }

  protected select(f: Flight):void{
    this.selectedFlight.set(f);
  }
}
