import { Routes, CanDeactivateFn } from '@angular/router';
import { BookingNavigation } from './feature-booking/booking-navigation';
import { FlightEdit } from './feature-booking/flight-edit/flight-edit';
import { FlightSearch } from './feature-booking/flight-search/flight-search';
import { PassengerSearch } from './feature-booking/passenger-search/passenger-search';
import { BoardingList } from './feature-boarding/boarding-list/boarding-list';
import { DefaultLanguageService, LanguageService } from '../shared/util-common/language';
import { authGuard, authMatch } from '../shared/util-auth/auth-guard';
import { BoardingLocked } from './feature-boarding/boarding-locked/boarding-locked';
import { exitGuard } from '../shared/util-common/exit-guard';

const ticketingRoutes: Routes = [
  {
    path: 'booking',
    component: BookingNavigation,
    providers: [{ provide: LanguageService, useClass: DefaultLanguageService }],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'flight-search' },
      { path: 'flight-search', component: FlightSearch },
      {
        path: 'flight-edit/:id',
        component: FlightEdit,
        canActivate: [authGuard],
        canDeactivate: [exitGuard],
      },
      { path: 'passenger-search', component: PassengerSearch },
    ],
  },
  { path: 'boarding', component: BoardingList, canMatch: [authMatch] },
  { path: 'boarding', component: BoardingLocked },
];

export default ticketingRoutes;
