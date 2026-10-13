import {
  booleanAttribute,
  Component,
  inject,
  input,
  linkedSignal,
  numberAttribute,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FlightClient } from '../../data/flight-client';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [RouterLink, FormField, FormRoot, JsonPipe],
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.html',
})
export class FlightEdit {

  private readonly flightClient = inject(FlightClient);

  // segmento do URL: flight-edit/:id
  readonly id = input.required({ transform: numberAttribute });

  private readonly flightResource = this.flightClient.findByIdResource(this.id);

  protected readonly flight = linkedSignal( () => {
    const flight = this.flightResource.value();
    return {...flight, date: toLocalInput(flight.date)}
  })

  protected readonly flightForm = form(this.flight, path => {
    required(path.from),
    required(path.to),
    required(path.date),
    minLength(path.from, 3)
  })

  isDirty(): boolean {
    return this.flightForm().dirty();
  }
}

function toLocalInput(iso: string): string {
  // enquanto o voo carrega, a data vem vazia
  if (!iso) {
    return '';
  }
  const date = new Date(iso);

  // getTimezoneOffset(): diferença para UTC em minutos (Lisboa no verão: -60)
  // deslocamos a data para que o toISOString() escreva a hora local
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);

  // "2026-09-22T13:40:00.000Z" → "2026-09-22T13:40"
  return local.toISOString().substring(0, 16);
}
