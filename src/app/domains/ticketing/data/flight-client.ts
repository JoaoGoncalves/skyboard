import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, Signal } from '@angular/core';
import { Flight, initialFlight } from './flight';
import { ConfigService } from '../../shared/util-common/config-service';
import { firstValueFrom } from 'rxjs';

@Service()
export class FlightClient {

  private readonly config = inject(ConfigService);
  private readonly http = inject(HttpClient)

  findResource(from: Signal<string>, to: Signal<string>) {
    return httpResource<Flight[]>(
      () => {
        if (!from() || !to()) {
          return undefined;
        }

        return {
          url: this.config.apiUrl,
          params: {
            from: from(),
            to: to(),
          },
        };
      },
      {
        defaultValue: [],
      },
    );
  }

  findByIdResource(id: Signal<number>){
    return httpResource<Flight>( ()=> `${this.config.apiUrl}/${id()}` , {
      defaultValue: initialFlight,
    })
  }

  save(flight: Flight): Promise<Flight>{
    return firstValueFrom(this.http.put<Flight>(`${this.config.apiUrl}/${flight.id}`, flight));
  }


}
