import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  private readonly router = inject(Router);

  protected startSearch(): void {
    this.router.navigate(['/ticketing/booking/flight-search']);
  }
}
