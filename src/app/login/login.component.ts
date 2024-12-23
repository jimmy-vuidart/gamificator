import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SecurityService } from '../../shared/services/security.service'


@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  standalone: false,
})
export class LoginComponent {

  // Template values
  formEmail: string
  formPassword: string

  loginInProgress: boolean

  constructor(private securityService: SecurityService, private router: Router) {
  }

  // Template methods
  public login(): void {
    this.loginInProgress = true

    this.securityService.login(this.formEmail, this.formPassword)
      .then(() => {
        this.loginInProgress = false
        this.router.navigate(['/'])

      })
      .catch((e) => {
        alert('Noob')
        console.log(e)
        this.loginInProgress = false
      })

  }


}


// WEBPACK FOOTER //
// ./src/app/login/login.component.ts
