import { Injectable } from '@angular/core'
import { Database, equalTo, limitToLast, list, listVal, object, orderByChild, push, query, ref, set } from '@angular/fire/database'
import { map, Observable, of, switchMap, take } from 'rxjs'
import { LibraryService } from './library.service'
import { UserService } from './user.service'

export interface IQuest {
  $key: string,
  title: string,
  experience: number,
  user: string,
  skill: any,
  category: string,
  createdOn: number
}

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private database: Database,
              private userService: UserService) {
  }

  public postQuest(quest: IQuest) {
    quest.createdOn = Date.now()
    if (quest.user) {
      return push(ref(this.database, `/users/${quest.user}/quests`), quest)
    } else {
      return this.userService.getUserTeamName().then((teamName) => {
        return push(ref(this.database, `/teams/${teamName}/quests`), quest)
      })
    }
  }

  private incrementTeamXp(quest: IQuest, teamName: string) {
    let teamXpObs = object(ref(this.database, `/teams/${teamName}/experience`))
    teamXpObs.pipe(take(1)).subscribe(exp => set(exp.snapshot.ref, exp.snapshot.val() + quest.experience))

    let teamSkillObs = object(ref(this.database, `/teams/${teamName}/skills/${quest.skill}/experience`))
    teamSkillObs.pipe(take(1)).subscribe(exp => set(exp.snapshot.ref, exp.snapshot.val() + quest.experience))

    let skillTeamObs = object(ref(this.database, `/skills/${quest.skill}/teams/${teamName}/experience`))
    skillTeamObs.pipe(take(1)).subscribe(exp => set(exp.snapshot.ref, exp.snapshot.val() + quest.experience))
  }

  public completeTeamQuest(quest: IQuest, teamName: any) {
    console.debug('QuestService > completeTeamQuest', quest, teamName)

    set(ref(this.database, '/teams/' + teamName + '/quests/' + quest.$key + '/completedOn'), Date.now())

    this.incrementTeamXp(quest, teamName)
  }

  public completeQuest(quest: IQuest, user: { team: string; $key: string; name: string }) {
    console.debug('QuestService > completeQuest')
    console.debug(quest)
    console.debug(user)

    // Writing everywhere to ease reading
    this.incrementTeamXp(quest, user.team)

    set(ref(this.database, `/users/${user.$key}/quests/${quest.$key}/completedOn`), Date.now())

    let userXp$ = object(ref(this.database, `/users/${user.$key}/experience`))
    userXp$.pipe(take(1)).subscribe(xp => set(xp.snapshot.ref, xp.snapshot.val() + quest.experience))

    let skillXp$ = object(ref(this.database, `/users/${user.$key}/skills/${quest.skill}/experience`))
    skillXp$.pipe(take(1)).subscribe(skillXp => set(skillXp.snapshot.ref, skillXp.snapshot.val() + quest.experience))

    let teamUserXp$ =  object(ref(this.database, `/skills/${quest.skill}/teams/${user.team}/members/${user.name}/experience`))
    teamUserXp$.pipe(take(1)).subscribe(skillXp => set(skillXp.snapshot.ref, skillXp.snapshot.val() + quest.experience))
  }

  public computeTotalCategoryXP(userId: string, skillId: any) {
    return new Promise((resolve, reject) => {
      listVal<any>(query(ref(this.database, `/users/${userId}/quests`), orderByChild('skill'), equalTo(skillId)))
        .subscribe((quests: any) => {
          let result = 0
          for (let i in quests) {
            result += quests[i].experience
          }
          resolve(result)
        })
    })
  }

  public getTeamQuests(teamName: string): Observable<any[]> {
    return listVal<any>(ref(this.database, `/teams/${teamName}/quests`))
  }

  public getFullTeamQuests(teamName: string): Observable<any> {
    let obs1 = this.getTeamQuests(teamName)
    let obs2 = this.getTeamMembersQuests(teamName)

    return obs1.pipe(switchMap((quests: any[]) => {
      return obs2.pipe(switchMap((quests2: any[]) => {
        return of(quests.concat(quests2))
      }))
    }))

  }

  public getTeamMembersQuests(teamName: string) {
    return listVal<any>(query(ref(this.database, '/users/'), orderByChild('team'), equalTo(teamName)))
      .pipe(
        map((users: any) => {
        let quests: any[] = []

        LibraryService.forEachKey(users, (user: { quests: any; name: any }) => {
          if (user.quests) {
            LibraryService.forEachKey(user.quests, (quest: { user: any }) => {
              quest.user = user.name
              quests.push(quest)
            })
          }
        })
        return quests
      }))
  }

  public getUserQuests(userId: string) {
    console.debug('QuestService > getUserQuests', userId)

    return listVal(ref(this.database, `/users/${userId}/quests`), {keyField: '$key'})
  }

  public getUserQuestsByCategory(userId: any, category: number) {
    console.debug('QuestService > getUserQuestsByCategory', userId, category)

    return this.getUserQuests(userId)
      .pipe(map((quests: any[]) => {
        quests = quests.filter(quest => {
          return quest.category === category
        })
        return quests
      }))
  }

  public getUserLatestQuests(userId: string) {
    return new Promise((resolve, reject) => {
      listVal<any>(query(ref(this.database, `/users/${userId}/quests`), orderByChild('createdOn'), limitToLast(5))).subscribe(quests => resolve(quests))
    })
  }
}


// WEBPACK FOOTER //
// ./src/shared/services/quest.service.ts
