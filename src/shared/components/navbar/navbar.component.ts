import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {UserService} from "../../services/user.service";
import {MenuService} from "shared/services/menu.service";
import {SecurityService} from "../../services/security.service";

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{

    private listTitles: any[];
    location: Location;

    constructor(location:Location, private userService: UserService, private menuService: MenuService, private securityService: SecurityService) {
        this.location = location;
    }

    ngOnInit(){
        this.menuService.getMenu().subscribe(menu => {
            this.listTitles = menu;
        });
    }

    getTitle(){
        let titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 1 );
        }
        if(titlee.charAt(0) === '/'){
            titlee = titlee.slice( 1 );
        }
        if(this.listTitles) {
            for (let item = 0; item < this.listTitles.length; item++) {
                if (this.listTitles[item].path === titlee) {
                    return this.listTitles[item].title;
                }
            }
        }
        return 'Dashboard';
    }

    public promote() {
        this.userService.toggleAdmin();
    }

    public logout() {
        this.securityService.logout();
    }
}



// WEBPACK FOOTER //
// ./src/shared/components/navbar/navbar.component.ts