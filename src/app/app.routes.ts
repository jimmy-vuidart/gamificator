import { Routes } from '@angular/router'
import { AdminAuthGuard } from '../shared/services/admin-auth-guard.service'
import { AuthGuard } from '../shared/services/auth-guard.service'
import { LoginGuard } from '../shared/services/login-guard.service'
import { DashboardComponent } from './admin/dashboard/dashboard.component'
import { QuestWriteComponent } from './admin/quest-write/quest-write.component'
import { AdminQuestComponent } from './admin/quests/admin-quests.component'
import { TeamLadderComponent } from './admin/team-ladder/team-ladder.component'
import { LayoutComponent } from './layout/layout.component'
import { LoginComponent } from './login/login.component'
import { HistoryComponent } from './user/history/history.component'
import { HomeComponent } from './user/home/home.component'
import { LadderComponent } from './user/ladder/ladder.component'
import { PersonalComponent } from './user/personal/personal.component'
import { QuestComponent } from './user/quests/quests.component'
import { TeamComponent } from './user/team/team.component'

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'team', component: TeamComponent},
      {path: 'personal', component: PersonalComponent},
      {path: 'quests', component: QuestComponent},
      {path: 'ladder', component: LadderComponent},
    ],
  },
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {
    path: 'admin', component: LayoutComponent, canActivate: [AdminAuthGuard], children: [
      {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'team', component: TeamLadderComponent},
      {path: 'ladder', component: LadderComponent},
      {path: 'quests', component: AdminQuestComponent},
      {path: 'quests/write', component: QuestWriteComponent},
    ],
  },
]


// WEBPACK FOOTER //
// ./src/app/app.routes.ts
