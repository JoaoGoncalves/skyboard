import { Component, computed, inject, signal, untracked } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Flight } from '../../data/flight';
import { DatePipe, JsonPipe } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { API_URL } from '../../data/api';
import { FlightCard } from '../../ui/flight-card/flight-card';
import { SimpleDelayStepper } from '../../../shared/ui-common/simple-delay-stepper/simple-delay-stepper';

@Component({
  imports: [FormField, JsonPipe, FlightCard, SimpleDelayStepper],
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
  //protected readonly selectedFlight = signal<Flight | null>(null);

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

  protected readonly maxDelay = signal(0);

  /* protected readonly flightRoute = computed(
    () => `${this.filter().from} ➔ ${this.filter().to}`
  ) */


  protected readonly from = computed(()=>this.filter().from)
  protected readonly to = computed(()=>this.filter().to)

  protected readonly flightRoute = computed(
    ()=> {
      const origin = this.from();
      const dest = untracked( ()=> this.to());
      return `${origin} ➔ ${dest}`;
    }
  );
  /* protected readonly flightRoute = computed(() => {
    const origin = this.filter().from;               // regista 'filter'
    const dest = untracked(() => this.filter().to);  // não regista... mas 'filter' já está registado
    return `${origin} → ${dest}`;                    // reage a QUALQUER alteração de 'filter'
  }); */

  protected updateBasket(flightId: number, selected: boolean): void {
    this.basket.update((basket) => ({
      ...basket,
      [flightId]: selected,
    }));
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

  /* protected select(f: Flight): void {
    this.selectedFlight.set(f);
  } */
}
