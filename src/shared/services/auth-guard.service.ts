import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { map, Observable, of, switchMap } from 'rxjs'
import { SecurityService } from './security.service'
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private securityService: SecurityService, private userService: UserService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    console.info('AuthGuard > canActivate()')

    return this.securityService.isLoggedIn()
      .pipe(switchMap((isLogged) => {
        if (!isLogged) {
          this.router.navigate(['/login'])
          return of(false)
        } else {
          return this.userService.isCurrentUserAdmin().pipe(map((adminStatus) => {
            if (!adminStatus) {
              return true
            } else {
              this.router.navigate(['/admin/dashboard'])
              return false
            }
          }))
        }
      }))
  }
}


// WEBPACK FOOTER //
// ./src/shared/services/auth-guard.service.ts
