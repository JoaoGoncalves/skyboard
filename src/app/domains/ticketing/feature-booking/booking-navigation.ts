import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LanguageService } from '../../shared/util-common/language';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-booking-navigation',
  templateUrl: './booking-navigation.html',
})
export class BookingNavigation {
  protected readonly userLang = inject(LanguageService).getUserLang();
}
