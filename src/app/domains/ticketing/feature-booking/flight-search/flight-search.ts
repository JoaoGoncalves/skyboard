import { JsonPipe } from '@angular/common';

import { Component, computed, inject, signal, untracked } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { SimpleDelayStepper } from '../../../shared/ui-common/simple-delay-stepper/simple-delay-stepper';
import { FlightCard } from '../../ui/flight-card/flight-card';
import { FlightClient } from '../../data/flight-client';

@Component({
  imports: [FormField, FlightCard, SimpleDelayStepper, RouterLink, JsonPipe],
  selector: 'app-flight-search',
  templateUrl: './flight-search.html',
})
export class FlightSearch {

  private readonly flightClient = inject(FlightClient);


  protected readonly filter = signal({
    from: 'Lisbon',
    to: 'Porto',
  });

  protected readonly filterForm = form(this.filter);

   protected readonly from = computed(() => this.filter().from);
  protected readonly to = computed(() => this.filter().to);

  protected readonly flightsResource = this.flightClient.findResource(this.from, this.to);

  protected readonly flights = this.flightsResource.value;
  protected readonly error = this.flightsResource.error;
  protected readonly isLoading = this.flightsResource.isLoading;
  protected readonly status = this.flightsResource.status;

  protected readonly basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  protected readonly maxDelay = signal(0);

 

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
