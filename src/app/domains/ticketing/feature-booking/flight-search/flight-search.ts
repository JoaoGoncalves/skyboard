import { JsonPipe } from '@angular/common';

import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { debounce, form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { SimpleDelayStepper } from '../../../shared/ui-common/simple-delay-stepper/simple-delay-stepper';
import { FlightCard } from '../../ui/flight-card/flight-card';
import { FlightStore } from './flight-store';


@Component({
  imports: [FormField, FlightCard, SimpleDelayStepper, RouterLink, JsonPipe],
  selector: 'app-flight-search',
  templateUrl: './flight-search.html',
})
export class FlightSearch {
  private readonly store = inject(FlightStore);

  protected readonly filter = linkedSignal(
    () => ({
      from: this.store.from(),
      to: this.store.to(),
    }),
    { set: (value) => this.store.updateFilter(value.from, value.to) },
  );

  protected readonly filterForm = form(this.filter, path => {
    debounce(path.from, 300);
    debounce(path.to, 300);
  });

  protected readonly flights = this.store.flights;
  protected readonly error = this.store.error;
  protected readonly isLoading = this.store.isLoading;
  protected readonly status = this.store.status;

  protected readonly basket = this.store.basket;

  protected readonly maxDelay = signal(0);

  protected readonly flightRoute = this.store.route;
  protected readonly selectedCount = this.store.selectedCount;

  protected updateBasket(flightId: number, selected: boolean): void {
    this.store.updateBasket(flightId, selected);
  }

  protected search(): void {
    this.store.reload();
  }
}
