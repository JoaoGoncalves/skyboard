import { applyWhenValue, hidden, min, minLength, required, schema } from '@angular/forms/signals';
import { Flight } from './flight';
import { validateRoundTrip } from './flight-validators';

export const flightSchema = schema<Flight>((path) => {
  required(path.from, { message: 'From is required' });
  minLength(path.from, 3, { message: 'From needs at least 3 characters' });
  required(path.to, { message: 'To is required' });
  required(path.date, { message: 'Date is required' });

  // schema logic: o delay só aparece se o voo estiver atrasado
  hidden(path.delay, { when: ({ valueOf }) => !valueOf(path.delayed) });

  // conditional validation: estes validators só valem quando delayed é true
  applyWhenValue(path, (flight) => flight.delayed, delayedFlight);

  validateRoundTrip(path);
});

export const delayedFlight = schema<Flight>((path) => {
  min(path.delay, 15, { message: 'A delay is at least 15 minutes' });
});