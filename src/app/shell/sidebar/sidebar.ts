import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { isActive, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  protected readonly router = inject(Router);

  protected readonly searchActive = isActive('/booking/flight-search', this.router);
  protected readonly boardingActive = isActive('/boarding', this.router);

  protected readonly inTicketing = computed( ()=> this.searchActive() || this.boardingActive());
}
