import { Routes } from '@angular/router';
import { BookingNavigation } from './feature-booking/booking-navigation';
import { FlightEdit } from './feature-booking/flight-edit/flight-edit';
import { FlightSearch } from './feature-booking/flight-search/flight-search';
import { PassengerSearch } from './feature-booking/passenger-search/passenger-search';
import { BoardingList } from './feature-boarding/boarding-list/boarding-list';

const ticketingRoutes: Routes = [
  {
    path: 'booking',
    component: BookingNavigation,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'flight-search' },
      { path: 'flight-search', component: FlightSearch },
      { path: 'flight-edit/:id', component: FlightEdit },
      { path: 'passenger-search', component: PassengerSearch },
    ],
  },
  { path: 'boarding', component: BoardingList },
];

export default ticketingRoutes;
