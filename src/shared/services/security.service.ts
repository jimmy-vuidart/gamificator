import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private auth: AngularFireAuth) {
  }

  public isLoggedIn() {
    return this.auth.authState.pipe(map((state) => !!state))
  }

  public login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  public logout() {
    let logout = this.auth.signOut()
    window.location.reload()
    return logout
  }
}


// WEBPACK FOOTER //
// ./src/shared/services/security.service.ts
