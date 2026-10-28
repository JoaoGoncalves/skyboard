import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../shared/util-common/config-service';
import { Passenger } from './passenger';

@Service()
export class PassengerClient {
  private readonly config = inject(ConfigService);
  private readonly http = inject(HttpClient);

  find(name: string): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.config.passengersUrl, {
      params: { name_like: name },
    });
  }
}
