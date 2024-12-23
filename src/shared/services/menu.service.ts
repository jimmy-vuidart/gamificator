import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { UserService } from './user.service'

@Injectable()
export class MenuService {

  private readonly ADMIN_ROUTES = [
    {path: '/admin/dashboard', title: 'Administration', icon: 'dashboard', class: ''},
    {path: '/admin/quests', title: 'Quêtes d\'équipe', icon: 'error_outline', class: ''},
    {path: '/admin/quests/write', title: 'Ecrire une quête', icon: 'assignment', class: ''},
    {path: '/admin/ladder', title: 'Classements', icon: 'list', class: ''},
    {path: '/admin/team', title: 'Détails équipe', icon: 'group', class: ''},
  ]
  private readonly USER_ROUTES = [
    {path: '/home', title: 'Dashboard', icon: 'dashboard', class: ''},
    {path: '/quests', title: 'Quêtes', icon: 'error_outline', class: ''},
    {path: '/ladder', title: 'Classements', icon: 'list', class: ''},
    {path: '/personal', title: 'Statistiques', icon: 'timeline', class: ''},
    {path: '/team', title: 'Equipe', icon: 'group', class: ''},
  ]

  constructor(private userService: UserService) {
  }

  public getMenu(): Observable<any> {
    return this.userService.isCurrentUserAdmin()
      .pipe(map((admin: any) => {
        return admin ? this.ADMIN_ROUTES : this.USER_ROUTES
      }))
  }
}
