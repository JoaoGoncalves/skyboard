import { Component, input, model, output } from '@angular/core';
import { Flight } from '../../data/flight';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-flight-card',
  templateUrl: './flight-card.html',
})
export class FlightCard {
  readonly item           = input.required<Flight>();
  readonly selected       = model(false);
  /* readonly selectedChange = output<boolean>(); */

  protected select(){
    this.selected.set(true);
  }
  protected deselect(){
    this.selected.set(false);
  }
}
