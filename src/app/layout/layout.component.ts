import { Component } from '@angular/core'
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'layout',
    templateUrl: 'layout.component.html',
    imports: [
        SidebarComponent,
        NavbarComponent,
        RouterOutlet,
    ],
})
export class LayoutComponent {

  private isLoggedIn = true

  constructor() {

  }
}


// WEBPACK FOOTER //
// ./src/app/layout/layout.component.ts
