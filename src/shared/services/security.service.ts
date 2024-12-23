

import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
@Injectable()
export class SecurityService {

    constructor(private auth: AngularFireAuth) {}

    public isLoggedIn() {
        return this.auth.authState.map((state) => !!state);
    }

    public login(email, password) {
        return this.auth.auth.signInWithEmailAndPassword(email, password);
    }

    public logout() {
        let logout = this.auth.auth.signOut();
        window.location.reload();
        return logout;
    }
}



// WEBPACK FOOTER //
// ./src/shared/services/security.service.ts