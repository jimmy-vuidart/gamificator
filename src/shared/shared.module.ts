
// Must export the config
import {NgModule} from "@angular/core";
import {ComponentsModule} from "./components/components.module";
import {ServicesModule} from "./services/services.module";

import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import * as firebase from "firebase/app";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
export const firebaseConfig = {
    apiKey: "AIzaSyBRFF5h1g2hzENrj44yHQDFyWurdFi0YTo",
    authDomain: "gamificator-2584b.firebaseapp.com",
    databaseURL: "https://gamificator-2584b.firebaseio.com",
    storageBucket: "gamificator-2584b.appspot.com",
    messagingSenderId: "924497922968"
};


@NgModule({
    declarations: [

    ],
    imports: [
        ComponentsModule,
        ServicesModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    providers: [],
    exports: [ComponentsModule, ServicesModule]
})
export class SharedModule {
}



// WEBPACK FOOTER //
// ./src/shared/shared.module.ts