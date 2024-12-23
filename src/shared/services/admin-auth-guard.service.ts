import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { map, Observable } from 'rxjs'
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    console.info('AdminAuthGuard > canActivate()')

    return this.userService.isCurrentUserAdmin().pipe(map((adminStatus) => {
      if (adminStatus) {
        return true
      } else {
        this.router.navigate(['/home'])
        return false
      }
    }))
  }
}


// WEBPACK FOOTER //
// ./src/shared/services/admin-auth-guard.service.ts
