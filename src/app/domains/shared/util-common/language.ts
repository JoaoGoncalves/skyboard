import { Service, inject, DestroyRef } from "@angular/core";

export abstract class LanguageService {
  abstract getUserLang(): string;
}

@Service({ autoProvided: false })
export class DefaultLanguageService implements LanguageService {
  constructor() {
    console.log('DefaultLanguageService: criado');
    inject(DestroyRef).onDestroy(() => console.log('DefaultLanguageService: destruído'));
  }

  getUserLang(): string {
    return 'en (default)';
  }
}

@Service({ autoProvided: false })
export class BrowserLanguageService implements LanguageService {
  constructor() {
    console.log('BrowserLanguageService: criado');
    inject(DestroyRef).onDestroy(() => console.log('BrowserLanguageService: destruído'));
  }

  getUserLang(): string {
    return navigator.language + ' (browser)';
  }
}

export type languageConfig = 'default' | 'browser';

export function provideLanguageService(config: languageConfig = 'default'){
    if (config === 'browser'){
        return [{provide: LanguageService, useClass: BrowserLanguageService}]
    }
    return [{provide: LanguageService, useClass: DefaultLanguageService}]
}