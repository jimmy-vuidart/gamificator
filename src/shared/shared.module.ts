// Must export the config
import { NgModule } from '@angular/core'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { ComponentsModule } from './components/components.module'
import { ServicesModule } from './services/services.module'

export const firebaseConfig = {
  apiKey: 'AIzaSyBRFF5h1g2hzENrj44yHQDFyWurdFi0YTo',
  authDomain: 'gamificator-2584b.firebaseapp.com',
  databaseURL: 'https://gamificator-2584b.firebaseio.com',
  storageBucket: 'gamificator-2584b.appspot.com',
  messagingSenderId: '924497922968',
}


@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    ServicesModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  exports: [ComponentsModule, ServicesModule],
})
export class SharedModule {
}


// WEBPACK FOOTER //
// ./src/shared/shared.module.ts
