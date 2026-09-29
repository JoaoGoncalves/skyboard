import { booleanAttribute, Component, effect, input, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.html',
})
export class FlightEdit {
  // segmento do URL: flight-edit/:id
  readonly id = input.required({ transform: numberAttribute });
  // matrix parameter: ;showDetails=true
  readonly showDetails = input(false, { transform: booleanAttribute });

  constructor() {
    effect(() => {
      console.log('id', this.id(), 'showDetails', this.showDetails());
    });
  }
}
