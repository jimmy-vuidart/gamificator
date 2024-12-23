import { CommonModule, DatePipe } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { DashboardComponent } from './admin/dashboard/dashboard.component'
import { QuestWriteComponent } from './admin/quest-write/quest-write.component'
import { AdminQuestComponent } from './admin/quests/admin-quests.component'
import { TeamLadderComponent } from './admin/team-ladder/team-ladder.component'
import { AppComponent } from './app.component'
import { routes } from './app.routes'

import { LayoutComponent } from './layout/layout.component'
import { LoginComponent } from './login/login.component'
import { HistoryComponent } from './user/history/history.component'
import { HomeComponent } from './user/home/home.component'
import { LadderComponent } from './user/ladder/ladder.component'
import { PersonalComponent } from './user/personal/personal.component'
import { QuestComponent } from './user/quests/quests.component'
import { TeamComponent } from './user/team/team.component'


@NgModule({
  declarations: [
    LayoutComponent,

    LoginComponent,

    HomeComponent,
    HistoryComponent,
    LadderComponent,
    QuestComponent,
    TeamComponent,

    DashboardComponent,
    PersonalComponent,
    AdminQuestComponent,
    QuestWriteComponent,
    TeamLadderComponent,
  ],

  imports: [
    SharedModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    DatePipe,
  ],
  providers: [],
})
export class AppModule {
}


// WEBPACK FOOTER //
// ./src/app/app.module.ts
