import { afterEveryRender, afterNextRender, Component, computed, effect, inject, Injector, resource, signal, untracked } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Flight } from '../../data/flight';
import { DatePipe, JsonPipe } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { API_URL } from '../../data/api';
import { FlightCard } from '../../ui/flight-card/flight-card';
import { SimpleDelayStepper } from '../../../shared/ui-common/simple-delay-stepper/simple-delay-stepper';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  imports: [FormField, JsonPipe, FlightCard, SimpleDelayStepper],
  selector: 'app-flight-search',
  templateUrl: './flight-search.html',
})
export class FlightSearch {
  private readonly http = inject(HttpClient);
  private readonly snackBar = inject(MatSnackBar);
  private readonly injector = inject(Injector)

  protected readonly filter = signal({
    from: 'Lisbon',
    to: 'Porto',
  });

  protected readonly filterForm = form(this.filter);
  //protected readonly flights = signal<Flight[]>([]);
  //protected readonly selectedFlight = signal<Flight | null>(null);

  protected readonly flightsResource = httpResource<Flight[]>(
    () => {
      const filter = this.filter();
      if (!filter.from || !filter.to) {
        return undefined;
      }

      return {
        url: API_URL,
        params: {
          from: this.filter().from,
          to: this.filter().to,
        },
      };
    },
    {
      defaultValue: [],
    },
  );

  /* protected readonly flightsResource = rxResource({
    params: () => {
      const filter = this.filter();
      return filter.from && filter.to ? filter : undefined
    },
    //stream: (loaderparams) => this.find(loaderparams.params.from, loaderparams.params.to),
    //stream: ({params}) => this.find(params.from, params.to),
    stream: ({params}) => this.find(params.from, params.to),
    defaultValue: [],
  }); */

  /* protected readonly flightsResource = resource({
    params: () => ({ from: this.filter().from, to: this.filter().to }),
    loader: ({ params, abortSignal }) =>
      fetch(`${API_URL}?from=${params.from}&to=${params.to}`, { signal: abortSignal }).then(
        (r) => r.json() as Promise<Flight[]>,
      ),
    defaultValue: [],
  }); */

  protected readonly flights = this.flightsResource.value;
  protected readonly error = this.flightsResource.error;
  protected readonly isLoading = this.flightsResource.isLoading;
  protected readonly status = this.flightsResource.status;

  protected readonly basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  protected readonly maxDelay = signal(0);

  protected readonly from = computed(() => this.filter().from);
  protected readonly to = computed(() => this.filter().to);

  protected readonly flightRoute = computed(() => {
    const origin = this.from();
    const dest = untracked(() => this.to());
    return `${origin} ➔ ${dest}`;
  });

  constructor(){
   /*  effect(()=> {
      const filter = this.filter();
      console.log("From: ", filter.from);
      console.log("To: ", filter.to);
    })
   this.showError();

   afterNextRender(()=> {
    console.log("From: (x1)", this.filter().from);
   })

   afterEveryRender(()=> {
    console.log("From: (every render)", this.filter().from);
   }) */
  
  }


  /* ngOnInit(): void {
    effect( ()=> console.log(this.filter()), {injector: this.injector})
  } */

  /* private find(from: string, to: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(API_URL, { params: { from, to } });
  } */

  protected updateBasket(flightId: number, selected: boolean): void {
    this.basket.update((basket) => ({
      ...basket,
      [flightId]: selected,
    }));
  }

  protected search(): void {
    /*  const filter = this.filter();
    const params = {
      from: filter.from,
      to: filter.to,
    }

    this.http.get<Flight[]>(API_URL, {params}).subscribe({
      next: flights => this.flights.set(flights),
      error: err => console.error("error: ", err)
    }) */

    this.flightsResource.reload();
  }

  private showError(){
    effect(()=> {
      const error = this.error();
      if (error) this.snackBar.open('Error Loading flights', 'OK')
    });
  }
}
