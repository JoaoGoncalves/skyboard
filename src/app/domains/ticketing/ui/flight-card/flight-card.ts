import { Component, computed, effect, input, model, output } from '@angular/core';
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

  constructor(){
    //console.log(this.selected());
    effect(()=> console.log(this.item()))
  }

  protected readonly flightRoute = computed(()=>{
    `${this.item().from} -> ${this.item().to} `
  })



  protected select(){
    this.selected.set(true);
  }
  protected deselect(){
    this.selected.set(false);
  }
}
