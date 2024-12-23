import { Component, ElementRef, ViewChild } from '@angular/core'

import { map, Observable } from 'rxjs'

import { LibraryService } from '../../../shared/services/library.service'
import { SkillService } from '../../../shared/services/skill.service'
import { TeamService } from '../../../shared/services/team.service'
import { UserService } from '../../../shared/services/user.service'

@Component({
  selector: 'team-ladder',
  templateUrl: 'team-ladder.component.html',
  styleUrls: ['team-ladder.component.scss'],
  standalone: false,
})
export class TeamLadderComponent {
  // Template values
  public teamMembers: Observable<any>
  public skills: Observable<any>

  public teamName

  // Work value
  public teams: Observable<any[]>

  // Library service
  public library: LibraryService

  @ViewChild('chartTarget')
  private chartTarget: ElementRef


  constructor(private teamService: TeamService, private skillService: SkillService, private userService: UserService, libraryService: LibraryService) {
    console.debug('QuestComponent > constructor()')

    this.library = libraryService
  }

  ngOnInit() {
    console.debug('QuestComponent > ngOnInit()')

    this.userService.getUserTeamNameObservable().subscribe((teamName) => {
      this.teamName = teamName

      this.teamMembers = this.teamService.getTeamMembers(teamName).pipe(
        map(members => {
          members.forEach(member => member.level = Math.floor(member.experience || 0 / 500))
          return members
        }),
        map(LibraryService.outputMap('Before sort')),
        map(LibraryService.orderByMap((m1, m2) => (m1.experience || 0) < (m2.experience || 0)))
    )

      this.skills = this.skillService.getSkills().pipe(
        map(skills => skills.filter(skill => skill.teams))
      )
    })
  }


}


// WEBPACK FOOTER //
// ./src/app/admin/team-ladder/team-ladder.component.ts
