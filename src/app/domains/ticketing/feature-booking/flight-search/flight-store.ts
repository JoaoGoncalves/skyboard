import { inject, Service, signal } from '@angular/core';
import { FlightClient } from '../../data/flight-client';

@Service()
export class FlightStore {
  private readonly flightClient = inject(FlightClient);

  private readonly _from = signal('Lisbon');
  readonly from = this._from.asReadonly();

  private readonly _to = signal('Porto');
  readonly to = this._to.asReadonly();

  private readonly _basket = signal<Record<number, boolean>>( {3: true, 5: true})
  readonly basket = this._basket.asReadonly();

  private readonly flightsResource = this.flightClient.findResource(this.from, this.to);

   readonly flights = this.flightsResource.value;
   readonly error = this.flightsResource.error;
   readonly isLoading = this.flightsResource.isLoading;
   readonly status = this.flightsResource.status;

  updateFilter(from: string, to: string){
    this._from.set(from);
    this._to.set(to);
  }

  updateBasket(flightId: number, selected: boolean){
    this._basket.update(basket => ({
        ...basket,
        [flightId]: selected,
    }))
  }

  reload():void{
    this.flightsResource.reload();
  }


}
