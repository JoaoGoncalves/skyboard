import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withExperimentalAutoCleanupInjectors, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideLanguageService } from './domains/shared/util-common/language';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules), withExperimentalAutoCleanupInjectors()),
    provideLanguageService('browser'),
  ],
};
