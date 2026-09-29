import { Component, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-simple-delay-stepper',
  templateUrl: './simple-delay-stepper.html',
})
export class SimpleDelayStepper {
  // model() = input() + output() com o sufixo Change:
  //   readonly value = input(0);
  //   readonly valueChange = output<number>();
  readonly value = model(0);

  protected increase(): void {
    this.value.update((v) => v + 15);
  }

  protected decrease(): void {
    this.value.update((v) => Math.max(v - 15, 0));
  }
}
