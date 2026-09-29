import { Component, input, output } from '@angular/core';
import { Passenger } from '../../data/passenger';

@Component({
  imports: [],
  selector: 'app-passenger-row',
  templateUrl: './passenger-row.html',
})
export class PassengerRow {
  readonly passenger = input.required<Passenger>();
  readonly boardedChange = output();

  protected toggle(): void {
    this.boardedChange.emit();
  }
}
