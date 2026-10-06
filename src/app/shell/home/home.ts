import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../domains/shared/util-common/language';

@Component({
  imports: [],
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  private readonly router = inject(Router);
  private readonly language = inject(LanguageService);

  protected readonly userLang = this.language.getUserLang();

  protected startSearch(): void {
    this.router.navigate(['/ticketing/booking/flight-search']);
  }
}
