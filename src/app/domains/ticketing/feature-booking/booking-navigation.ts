import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-booking-navigation',
  templateUrl: './booking-navigation.html',
})
export class BookingNavigation {}
