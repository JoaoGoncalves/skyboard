import { patchState, signalStore, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { Passenger } from "../../data/passenger";
import { inject } from "@angular/core";
import { PassengerClient } from "../../data/passenger-client";
import { pipe, debounceTime, distinctUntilChanged, tap, switchMap, catchError, EMPTY } from "rxjs";
import { rxMethod } from '@ngrx/signals/rxjs-interop';

type PassengerSearchState = {
  name: string;
  passengers: Passenger[];
  isLoading: boolean;
  error: string | null;
};

const initialState: PassengerSearchState = {
  name: '',
  passengers: [],
  isLoading: false,
  error: null,
};


export const PassengerStore = signalStore(
    { providedIn: 'root'},
    withState(initialState),
    withProps(()=>({
        _passengerClient: inject(PassengerClient),
    })),
    withMethods((store) => ({
    updateName(name: string): void {
      patchState(store, { name });
    },
    _load: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((name) =>
          store._passengerClient.find(name).pipe(
            tap((passengers) => patchState(store, { passengers, isLoading: false })),
            catchError(() => {
              patchState(store, { error: 'Could not load passengers', isLoading: false });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks((store) => ({
    onInit(): void {
      store._load(store.name);
    },
  })),
)