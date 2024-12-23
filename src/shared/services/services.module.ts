// Must export the config
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EmailAuthProvider } from '@angular/fire/auth'
import { AngularFireModule } from '@angular/fire/compat'
import { RouterModule } from '@angular/router'
import { AdminAuthGuard } from './admin-auth-guard.service'
import { AuthGuard } from './auth-guard.service'
import { LibraryService } from './library.service'
import { LoginGuard } from './login-guard.service'
import { MenuService } from './menu.service'
import { NotificationService } from './notification.service'
import { QuestService } from './quest.service'
import { SecurityService } from './security.service'
import { SkillService } from './skill.service'
import { TeamService } from './team.service'
import { UserService } from './user.service'

export const firebaseConfig = {
  apiKey: 'AIzaSyBRFF5h1g2hzENrj44yHQDFyWurdFi0YTo',
  authDomain: 'gamificator-2584b.firebaseapp.com',
  databaseURL: 'https://gamificator-2584b.firebaseio.com',
  storageBucket: 'gamificator-2584b.appspot.com',
  messagingSenderId: '924497922968',
}

const firebaseAuthConfig = {
  provider: EmailAuthProvider.PROVIDER_ID,
  method: EmailAuthProvider.PROVIDER_ID,
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    LibraryService,
    MenuService,
    NotificationService,
    UserService,
    SkillService,
    QuestService,
    TeamService,
    SecurityService,
    LoginGuard,
    AdminAuthGuard,
    AuthGuard],
  exports: [],
})
export class ServicesModule {
}


// WEBPACK FOOTER //
// ./src/shared/services/services.module.ts
