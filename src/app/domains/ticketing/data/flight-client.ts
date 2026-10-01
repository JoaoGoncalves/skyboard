import { httpResource } from '@angular/common/http';
import { inject, Service, Signal } from '@angular/core';
import { Flight } from './flight';
import { ConfigService } from '../../shared/util-common/config-service';

@Service()
export class FlightClient {

    private readonly config = inject(ConfigService);

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
}
