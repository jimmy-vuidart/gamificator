
import {Component} from "@angular/core";
import {SecurityService} from "../shared/services/security.service";

@Component({
    selector: 'application',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    private isLoggedIn = true;

    constructor() {

    }
}




// WEBPACK FOOTER //
// ./src/app/app.component.ts