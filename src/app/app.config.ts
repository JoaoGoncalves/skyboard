import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withExperimentalAutoCleanupInjectors, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideLanguageService } from './domains/shared/util-common/language';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './domains/shared/util-auth/auth-interceptor';
import { loggingInterceptor } from './domains/shared/ui-common/logging-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules), withExperimentalAutoCleanupInjectors()),
    provideLanguageService('browser'),
    provideHttpClient(withInterceptors([ authInterceptor, loggingInterceptor,]))
  ],
};
