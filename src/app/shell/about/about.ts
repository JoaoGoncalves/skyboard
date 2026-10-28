import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DefaultLanguageService, LanguageService } from '../../domains/shared/util-common/language';

@Component({
  imports: [],
  selector: 'app-about',
  templateUrl: './about.html',
  providers:[{provide: LanguageService, useClass: DefaultLanguageService}]
})
export default class About {
  protected readonly userLang = inject(LanguageService).getUserLang();

  protected readonly now = signal(new Date().toLocaleTimeString());

  constructor() {
    const id = setInterval(() => {
      this.now.set(new Date().toLocaleTimeString());
      console.log('tick', this.now());
    }, 1000);

    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}
