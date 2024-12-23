import {Injectable}     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';
import 'rxjs/Rx';
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {SecurityService} from "./security.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private securityService: SecurityService, private userService: UserService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        console.info("AuthGuard > canActivate()");

        return this.securityService.isLoggedIn()
            .switchMap((isLogged) => {
                if (!isLogged) {
                    this.router.navigate(['/login']);
                    return Observable.of(false);
                }
                else {
                    return this.userService.isCurrentUserAdmin().map((adminStatus) => {
                        if (!adminStatus) {
                            return true;
                        }
                        else {
                            this.router.navigate(['/admin/dashboard']);
                            return false;
                        }
                    });
                }
            });}
}



// WEBPACK FOOTER //
// ./src/shared/services/auth-guard.service.ts