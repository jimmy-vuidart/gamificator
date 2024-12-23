import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { AngularFireModule } from '@angular/fire/compat'
import { getDatabase, provideDatabase } from '@angular/fire/database'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'

export const firebaseConfig = {
  apiKey: 'AIzaSyBRFF5h1g2hzENrj44yHQDFyWurdFi0YTo',
  authDomain: 'gamificator-2584b.firebaseapp.com',
  databaseURL: 'https://gamificator-2584b.firebaseio.com',
  storageBucket: 'gamificator-2584b.appspot.com',
  messagingSenderId: '924497922968',
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),

    importProvidersFrom([AngularFireModule.initializeApp(firebaseConfig)]),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
  ],
}
