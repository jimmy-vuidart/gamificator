import { HttpClientModule } from '@angular/common/http'
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {RouterModule} from "@angular/router";

import {appRoutes} from "./app.routes";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {QuestWriteComponent} from "./admin/quest-write/quest-write.component";
import {SharedModule} from "../shared/shared.module";
import {HomeComponent} from "./user/home/home.component";
import {HistoryComponent} from "./user/history/history.component";
import {QuestComponent} from "./user/quests/quests.component";
import {CommonModule} from "@angular/common";
import {LadderComponent} from "./user/ladder/ladder.component";
import {TeamComponent} from "./user/team/team.component";
import {TeamLadderComponent} from "./admin/team-ladder/team-ladder.component";
import {AdminQuestComponent} from "./admin/quests/admin-quests.component";
import {LayoutComponent} from "./layout/layout.component";
import {PersonalComponent} from "./user/personal/personal.component";


@NgModule({
    declarations: [
        AppComponent,
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
        TeamLadderComponent
    ],

    imports: [
        SharedModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}



// WEBPACK FOOTER //
// ./src/app/app.module.ts
