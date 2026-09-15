import { Component, input, model, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-simple-delay-stepper',
  templateUrl: './simple-delay-stepper.html',
})
export class SimpleDelayStepper {
  readonly value = model(0); // input() + output()
 /*  readonly value = input(0);
  readonly valueChange = output<number>(); */

  protected increase(){
    this.value.update( v => v + 15);
  }
  protected decrease(){
    this.value.update( v => Math.max(v - 15, 0));
  }

}
