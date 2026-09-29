import { DatePipe } from '@angular/common';
import { Component, computed, input, model } from '@angular/core';
import { Flight } from '../../data/flight';

@Component({
  imports: [DatePipe],
  selector: 'app-flight-card',
  templateUrl: './flight-card.html',
})
export class FlightCard {
  readonly item = input.required<Flight>();
  readonly selected = model(false);

  protected readonly flightRoute = computed(() => `${this.item().from} ➔ ${this.item().to}`);

  protected select(): void {
    this.selected.set(true);
  }

  protected deselect(): void {
    this.selected.set(false);
  }
}
