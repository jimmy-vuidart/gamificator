import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { getDatabase, provideDatabase } from '@angular/fire/database'
import { provideRouter } from '@angular/router'
import { AppModule } from './app.module'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {

  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp({})),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),

    importProvidersFrom(AppModule),
  ],
}
