import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Flight } from '../../data/flight';
import { initialAircraft } from '../../data/aircraft';
import { DatePipe, JsonPipe } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { API_URL } from '../../data/api';

@Component({
  imports: [FormField, JsonPipe, DatePipe],
  selector: 'app-flight-search',
  templateUrl: './flight-search.html',
})
export class FlightSearch {
  private readonly http = inject(HttpClient);

  protected readonly filter = signal({
    from: 'Lisbon',
    to: 'Porto',
  });

  protected readonly filterForm = form(this.filter);
  //protected readonly flights = signal<Flight[]>([]);
  protected readonly selectedFlight = signal<Flight | null>(null);

  protected readonly flightsResources = httpResource<Flight[]>(
    () => {
      const filter = this.filter();
      if (!filter.from || !filter.to) {
        return undefined;
      }

      return {
        url: API_URL,
        params: {
          from: this.filter().from,
          to: this.filter().to,
        },
      };
    },
    {
      defaultValue: [],
    },

    /* () => ({
      url: API_URL,
      params: {
        from: this.filter().from,
        to: this.filter().to,
      }
    }),
    {
      defaultValue: []
    } */
  );

  protected readonly flights = this.flightsResources.value;
  protected readonly error = this.flightsResources.error;
  protected readonly isLoading = this.flightsResources.isLoading;
  protected readonly status = this.flightsResources.status;


  protected readonly basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  protected updateBasket(flightId: number, selected:boolean):void{
    this.basket.update( basket => ({
      ...basket,
      [flightId]: selected,
    }))
  }
  

  protected search(): void {
    /*  const filter = this.filter();
    const params = {
      from: filter.from,
      to: filter.to,
    }

    this.http.get<Flight[]>(API_URL, {params}).subscribe({
      next: flights => this.flights.set(flights),
      error: err => console.error("error: ", err)
    }) */

    this.flightsResources.reload();
  }

  protected select(f: Flight): void {
    this.selectedFlight.set(f);
  }
}
