import { Component } from '@angular/core'
import { map, Observable } from 'rxjs'
import { LibraryService } from '../../../shared/services/library.service'
import { TeamService } from '../../../shared/services/team.service'
import { UserService } from '../../../shared/services/user.service'

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent {
  team: Observable<any>

  teamLatestQuests: Observable<any>
  teamLatestDoneQuests: Observable<any>

  constructor(private teamService: TeamService, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUserTeamNameObservable()
      .subscribe(teamName => {
        console.log('Team name ? ', teamName)
        this.team = this.teamService.getTeam(teamName)

        this.teamLatestQuests = this.teamService.getTeamLatestQuests(teamName).pipe(
          map(LibraryService.filterMap(q => !q.completedOn)),
          map(LibraryService.orderByMap((q1, q2) => q1.createdOn < q2.completedOn)),
      )
        this.teamLatestDoneQuests = this.teamService.getTeamLatestCompletedQuests(teamName)
      })

  }
}


// WEBPACK FOOTER //
// ./src/app/admin/dashboard/dashboard.component.ts
