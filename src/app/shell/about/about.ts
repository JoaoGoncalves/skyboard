import { Component, inject } from '@angular/core';
import { DefaultLanguageService, LanguageService } from '../../domains/shared/util-common/language';

@Component({
  imports: [],
  selector: 'app-about',
  templateUrl: './about.html',
  providers:[{provide: LanguageService, useClass: DefaultLanguageService}]
})
export default class About {
  protected readonly userLang = inject(LanguageService).getUserLang();
}
