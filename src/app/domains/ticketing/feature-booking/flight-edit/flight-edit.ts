import { booleanAttribute, Component, effect, inject, input, numberAttribute } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.html',
})
export class FlightEdit {

  private readonly router = inject(Router);

  // segmento do URL: flight-edit/:id
  readonly id = input.required({ transform: numberAttribute });
  // matrix parameter: ;showDetails=true
  readonly showDetails = input(false, { transform: booleanAttribute });
  // query string ?expertMode=true
  readonly expertMode = input(false, {transform: booleanAttribute});

  constructor() {
    effect(() => {
      console.log('id', this.id(), 'showDetails', this.showDetails(), 'Expert mode', this.expertMode());
    });
  }

  protected teste(){
    this.router.navigate([], {
      queryParams: {xpto: false},
      /* queryParamsHandling: 'preserve', */
      fragment: 'outra',
    })
  }
}
