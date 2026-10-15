import { Component, computed, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidationError } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'app-validation-pane',
  templateUrl: './validation-pane.html',
})
export class ValidationPane {
  readonly errors = input.required<ValidationError[]>();

  protected readonly messages = computed(() =>
    this.errors().map((error) => error.message ?? toMessage(error)),
  );
}

function toMessage(error: ValidationError): string {
  switch (error.kind) {
    case 'required':
      return 'Enter a value';
    case 'min':
      return 'Value is too small';
    default:
      return error.kind;
  }
}
