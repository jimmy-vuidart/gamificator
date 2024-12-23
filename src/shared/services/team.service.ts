import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { map, Observable, of, switchMap, take } from 'rxjs'
import { LibraryService } from './library.service'
import { QuestService } from './quest.service'
import { SkillService } from './skill.service'
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private skillService: SkillService,
              private questService: QuestService,
              private database: AngularFireDatabase,
              private auth: AngularFireAuth,
              private userService: UserService) {
  }

  public getTeams(): Observable<any[]> {
    return this.database.list('/teams').valueChanges()
  }

  public getCurrentTeam(): Observable<any> {
    return this.userService.getCurrentUser()
      .pipe(map(user => {
        return this.getTeam(user.team)
      }))
  }

  public getTeamsXP(skill?: any, includeZero?: any): Observable<any[]> {

    if (includeZero == null) {
      includeZero = true
    }

    return this.getTeams().pipe(
      map(teams => {
        teams.forEach((team) => {
          team.experience = 0
          Object.keys(team.quests).map(function (objectKey, index) {
            let quest = team.quests[objectKey]
            if (quest.completedOn && (!skill || quest.skill == skill)) {
              team.experience += quest.experience
            }
          })

          this.getTeamMembers(team.$key).pipe(take(1)).subscribe(members => {
            LibraryService.forEachKey(members, (member: { $key: string }) => {
              this.userService.getUserXP(member.$key, skill).subscribe(xp => {
                team.experience += xp
              })
            })
          })
        })
        return teams
      }),
      map(teams => {
        if (!includeZero) {
          teams = teams.filter(team => team.experience > 0)
        }
        return teams
      }),
    )
  }

  public getTeam(teamName: any): Observable<any> {
    console.info('TeamService > getTeam(', teamName, ')')

    return this.database.object('/teams/' + teamName).valueChanges()
  }

  public getTeamMembers(teamName: string): Observable<any> {
    console.info('TeamService > getTeamMembers(', teamName, ')')

    return this.database
      .list('/users', ref => ref.orderByChild('team').equalTo(teamName))
      .valueChanges()
      .pipe(
        map(users => users.filter((user: any) => !user.admin)),
      )
  }

  public getTeamLatestQuests(teamName: string): Observable<any> {
    console.debug('TeamService > getTeamLatestQuests', teamName)

    let obs1 = this.questService.getTeamQuests(teamName)
    let obs2 = this.questService.getTeamMembersQuests(teamName)

    return obs1.pipe(switchMap((quests: any) => {
      return obs2.pipe(switchMap((quests2: any) => {
        return of(quests.concat(quests2)).pipe(
          map(LibraryService.orderByMap((q1, q2) => q1.createdOn < q2.createdOn)),
          map(LibraryService.limitByMap(5)),
          map(LibraryService.outputMap('After filter and sort for latest assigned')),
        )
      }))
    }))
  }

  public getTeamLatestCompletedQuests(teamName: any): Observable<any> {
    console.debug('TeamService > getTeamLatestQuests', teamName)

    let obs1 = this.questService.getTeamQuests(teamName)
    let obs2 = this.questService.getTeamMembersQuests(teamName)

    return obs1.pipe(switchMap((quests: any) => {
      return obs2.pipe(switchMap(quests2 => {
        return of(quests.concat(quests2)).pipe(
          map(LibraryService.filterMap(q1 => q1.completedOn)),
          map(LibraryService.orderByMap((q1: any, q2: any) => q1.createdOn < q2.createdOn)),
          map(LibraryService.limitByMap(5)),
          map(LibraryService.outputMap('After filter and sort for recent completed')),
        )
      }))
    }))
  }
}

