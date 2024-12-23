import {Injectable}     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';
import 'rxjs/Rx';
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {SecurityService} from "./security.service";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private securityService: SecurityService, private userService: UserService, private router: Router) {
    }

    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.securityService.isLoggedIn().subscribe((isLogged) => {
                if(isLogged) {
                    this.router.navigate(['/home']);
                    reject(false);
                    return false;
                }
                else {
                    resolve(true);
                    return true;
                }
            })

        });

    }
}



// WEBPACK FOOTER //
// ./src/shared/services/login-guard.service.ts