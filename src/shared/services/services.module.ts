// Must export the config
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CategoryService} from "./category.service";
import {QuestService} from "./quest.service";
import {UserService} from "./user.service";
import {AdminAuthGuard} from "./admin-auth-guard.service";
import {AuthGuard} from "./auth-guard.service";
import {AngularFireModule} from "angularfire2";
import * as firebase from "firebase/app";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import {TeamService} from "./team.service";
import {SkillService} from "./skill.service";
import {LibraryService} from "./library.service";
import {MenuService} from "./menu.service";
import {NotificationService} from "./notification.service";
import {SecurityService} from "./security.service";
import {LoginGuard} from "./login-guard.service";

export const firebaseConfig = {
    apiKey: "AIzaSyBRFF5h1g2hzENrj44yHQDFyWurdFi0YTo",
    authDomain: "gamificator-2584b.firebaseapp.com",
    databaseURL: "https://gamificator-2584b.firebaseio.com",
    storageBucket: "gamificator-2584b.appspot.com",
    messagingSenderId: "924497922968"
};

const firebaseAuthConfig = {
    provider: EmailAuthProvider.PROVIDER_ID,
    method: EmailAuthProvider.PROVIDER_ID
};

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [
        LibraryService,
        MenuService,
        NotificationService,
        UserService,
        SkillService,
        CategoryService,
        QuestService,
        TeamService,
        SecurityService,
        LoginGuard,
        AdminAuthGuard,
        AuthGuard],
    exports: []
})
export class ServicesModule {}



// WEBPACK FOOTER //
// ./src/shared/services/services.module.ts