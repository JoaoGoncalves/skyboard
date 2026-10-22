import { inject , computed} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withProps, withState} from '@ngrx/signals';
import { FlightClient } from '../../data/flight-client';

type FlightSearchState = {
  from: string;
  to: string;
  basket: Record<number, boolean>;
}

const initialState: FlightSearchState = {
  from: 'Lisbon',
  to: 'Porto',
  basket: {3: true, 5: true}
}

export const FlightStore = signalStore(
   { providedIn: 'root' },
   withState(initialState),
   withProps( (store) => ({
    _flightRessource : inject(FlightClient).findResource(store.from, store.to)
   })),
   withProps( (store) => ({
    flights: store._flightRessource.value,
    error: store._flightRessource.error,
    isLoading: store._flightRessource.isLoading,
    status: store._flightRessource.status,
   })),
   withMethods((store) => ({
    updateFilter(from: string, to : string): void{
      patchState(store, {from, to});
    },
    updateBasket(flightId: number, selected: boolean){
      patchState(store , state => ({
        basket: {...state.basket, [flightId]: selected}
      }))
    },
    reload():void{
      store._flightRessource.reload()
    }
   })),
   withComputed(store => ({
    route: computed(()=> `${store.from()} ➙ ${store.to()}`),
    selectedCount : computed (()=> Object.values(store.basket()).filter(Boolean).length) 
   }))  
)