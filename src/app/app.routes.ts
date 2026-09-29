import { Routes } from '@angular/router';
import { Home } from './shell/home/home';
import { FlightSearch } from './domains/ticketing/feature-booking/flight-search/flight-search';
import { PassengerSearch } from './domains/ticketing/feature-booking/passenger-search/passenger-search';
import { BoardingList } from './domains/ticketing/feature-boarding/boarding-list/boarding-list';
import { About } from './shell/about/about';
import { FlightEdit } from './domains/ticketing/feature-booking/flight-edit/flight-edit';
import { BookingNavigation } from './domains/ticketing/feature-booking/booking-navigation';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home },
  //{ path: 'ticketing', children: ticketingRoutes},
  { path: 'ticketing', 
    loadChildren: () =>import('./domains/ticketing/ticketing.routes')},
  { path: 'about', component: About },
  { path: '**', redirectTo: 'home' },
];
