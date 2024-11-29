import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.irebaseConfig) // Initialize Firebase using environment file
    )
  ]
};
