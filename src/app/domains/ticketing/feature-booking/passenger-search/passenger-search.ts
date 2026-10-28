import { Component, inject, linkedSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { PassengerStore } from './passenger-store';

@Component({
  imports: [FormField],
  selector: 'app-passenger-search',
  templateUrl: './passenger-search.html',
})
export class PassengerSearch {
  private readonly store = inject(PassengerStore);

  protected readonly name = linkedSignal(() => this.store.name(), {
    set: (value) => this.store.updateName(value),
  });
  protected readonly nameForm = form(this.name);

  protected readonly passengers = this.store.passengers;
  protected readonly isLoading = this.store.isLoading;
  protected readonly error = this.store.error;
}
