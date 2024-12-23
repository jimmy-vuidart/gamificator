import { Component } from '@angular/core'
import { map, Observable } from 'rxjs'
import { LibraryService } from '../../../shared/services/library.service'
import { SkillService } from '../../../shared/services/skill.service'
import { TeamService } from '../../../shared/services/team.service'
import { UserService } from '../../../shared/services/user.service'
import { NgFor, NgClass, NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'ladder',
    templateUrl: 'ladder.component.html',
    styleUrls: ['ladder.component.scss'],
    imports: [
        NgFor,
        NgClass,
        NgIf,
        AsyncPipe,
    ],
})
export class LadderComponent {
  // Work value
  public teams: Observable<any[]>
  public skills: Observable<any[]>

  public teamName

  constructor(private teamService: TeamService, private skillService: SkillService, private user: UserService, protected library: LibraryService) {
    console.debug('QuestComponent > constructor()')
  }

  ngOnInit() {
    console.debug('QuestComponent > ngOnInit()')

    this.teams = this.teamService.getTeams().pipe(
      map(LibraryService.forEachKeyMap(t => t.experience = t.experience || 0)),
      map(LibraryService.orderByMap((t1, t2) => t1.experience < t2.experience)),
    )

    this.skills = this.skillService.getSkills().pipe(
      map(skills => skills.filter(skill => skill.teams)),
    )

    this.user.getUserTeamNameObservable().subscribe(teamName => this.teamName = teamName)
  }

}


// WEBPACK FOOTER //
// ./src/app/user/ladder/ladder.component.ts
