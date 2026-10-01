import { Service } from '@angular/core';

@Service()
export class ConfigService {
    readonly apiUrl = 'http://localhost:3000/flights'
}
