import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, signal, untracked } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { SimpleDelayStepper } from '../../../shared/ui-common/simple-delay-stepper/simple-delay-stepper';
import { API_URL } from '../../data/api';
import { Flight } from '../../data/flight';
import { FlightCard } from '../../ui/flight-card/flight-card';

@Component({
  imports: [FormField, FlightCard, SimpleDelayStepper, RouterLink, JsonPipe],
  selector: 'app-flight-search',
  templateUrl: './flight-search.html',
})
export class FlightSearch {
  protected readonly filter = signal({
    from: 'Lisbon',
    to: 'Porto',
  });

  protected readonly filterForm = form(this.filter);

  protected readonly flightsResource = httpResource<Flight[]>(
    () => {
      const filter = this.filter();
      if (!filter.from || !filter.to) {
        return undefined;
      }

      return {
        url: API_URL,
        params: {
          from: filter.from,
          to: filter.to,
        },
      };
    },
    {
      defaultValue: [],
    },
  );

  protected readonly flights = this.flightsResource.value;
  protected readonly error = this.flightsResource.error;
  protected readonly isLoading = this.flightsResource.isLoading;
  protected readonly status = this.flightsResource.status;

  protected readonly basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  protected readonly maxDelay = signal(0);

  protected readonly from = computed(() => this.filter().from);
  protected readonly to = computed(() => this.filter().to);

  protected readonly flightRoute = computed(() => {
    const origin = this.from();
    const dest = untracked(() => this.to());
    return `${origin} ➔ ${dest}`;
  });

  protected updateBasket(flightId: number, selected: boolean): void {
    this.basket.update((basket) => ({
      ...basket,
      [flightId]: selected,
    }));
  }

  protected search(): void {
    this.flightsResource.reload();
  }
}
