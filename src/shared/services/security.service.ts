import { Injectable } from '@angular/core'
import { Auth, authState, signInWithEmailAndPassword, User } from '@angular/fire/auth'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  authState$: Observable<User | null>

  constructor(private auth: Auth) {
    this.authState$ = authState(this.auth)
  }

  public isLoggedIn() {
    return this.authState$.pipe(map((state) => !!state))
  }

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  public logout() {
    let logout = this.auth.signOut()
    window.location.reload()
    return logout
  }
}


// WEBPACK FOOTER //
// ./src/shared/services/security.service.ts
