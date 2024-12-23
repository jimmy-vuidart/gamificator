import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { MenuService } from '../../services/menu.service'
import { UserService } from '../../services/user.service'
import { NgFor, AsyncPipe } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';

declare var $: any

declare function moveToActive();

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss'],
    imports: [
        NgFor,
        RouterLinkActive,
        RouterLink,
        AsyncPipe,
    ],
})

export class SidebarComponent implements OnInit {
  public menuItems: any[]
  public user: Observable<any>

  constructor(private userService: UserService, private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.getMenu().subscribe(menu => {
      this.menuItems = menu

      $.getScript('../../assets/js/sidebar-moving-tab.js')
      setTimeout(() => {
        this.moveToActive()
      }, 2000)

    })

    this.user = this.userService.getCurrentUser()

    // this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  public moveToActive() {
    setTimeout(function () {
      // console.log('incep animatia cu 1ms delay');
      let $this = $('.sidebar .nav').find('li.active a')
      if (!$this.parent('li') || !$this.parent('li').position()) {
        return
      }

      let $current_li_distance = $this.parent('li').position().top - 10

      let button_text = $this.html()

      $('.moving-tab').css('width', 230 + 'px')

      $('.moving-tab').css({
        'transform': 'translate3d(0,' + $current_li_distance + 'px, 0)',
        'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
      })

      setTimeout(function () {
        $('.moving-tab').html(button_text)
      }, 100)
    }, 1)
  }
}
