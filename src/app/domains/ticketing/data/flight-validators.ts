import { SchemaPath, validate } from '@angular/forms/signals';
import { Flight } from './flight';

// domain rule que olha para dois fields: From e To não podem ser iguais
export function validateRoundTrip(path: SchemaPath<Flight>) {
  validate(path, ({ value }) => {
    const { from, to } = value();
    if (from && from.toLowerCase() === to.toLowerCase()) {
      return { kind: 'roundtrip', message: 'From and To must be different' };
    }
    return null;
  });
}