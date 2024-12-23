import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {

  private isLoggedIn = true

  constructor() {

  }
}


// WEBPACK FOOTER //
// ./src/app/app.component.ts
