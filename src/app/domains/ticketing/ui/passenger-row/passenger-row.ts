import { Component, input, output } from '@angular/core';
import { Passenger } from '../../data/passenger';

@Component({
  imports: [],
  selector: 'app-passenger-row',
  templateUrl: './passenger-row.html',
})
export class PassengerRow {
  passenger = input.required<Passenger>();
  boardedChange = output();

  protected toggle(): void {
    this.boardedChange.emit();
  }
}
