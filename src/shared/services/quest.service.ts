import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'
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

  constructor(private database: AngularFireDatabase,
              private userService: UserService) {
  }

  public postQuest(quest: IQuest) {
    quest.createdOn = Date.now()
    if (quest.user) {
      return this.database.list('/users/' + quest.user + '/quests').push(quest)
    } else {
      return this.userService.getUserTeamName().then((teamName) => {
        return this.database.list('/teams/' + teamName + '/quests').push(quest)
      })
    }
  }

  private incrementTeamXp(quest: IQuest, teamName: string) {
    let teamXpObs = this.database.object<any>('/teams/' + teamName + '/experience')
    teamXpObs.snapshotChanges().pipe(take(1)).subscribe(exp => teamXpObs.set(exp.payload.val() + quest.experience))

    let teamSkillObs = this.database.object<any>('/teams/' + teamName + '/skills/' + quest.skill + '/experience')
    teamSkillObs.snapshotChanges().pipe(take(1)).subscribe(exp => teamSkillObs.set(exp.payload.val() + quest.experience))

    let skillTeamObs = this.database.object<any>('/skills/' + quest.skill + '/teams/' + teamName + '/experience')
    skillTeamObs.snapshotChanges().pipe(take(1)).subscribe(exp => skillTeamObs.set(exp.payload.val() + quest.experience))
  }

  public completeTeamQuest(quest: IQuest, teamName: any) {
    console.debug('QuestService > completeTeamQuest', quest, teamName)

    this.database.object('/teams/' + teamName + '/quests/' + quest.$key + '/completedOn').set(Date.now())

    this.incrementTeamXp(quest, teamName)
  }

  public completeQuest(quest: IQuest, user: { team: string; $key: string; name: string }) {
    console.debug('QuestService > completeQuest')
    console.debug(quest)
    console.debug(user)

    // Writing everywhere to ease reading
    this.incrementTeamXp(quest, user.team)

    this.database.object('/users/' + user.$key + '/quests/' + quest.$key + '/completedOn').set(Date.now())

    let xpObs = this.database.object<any>('/users/' + user.$key + '/experience')
    xpObs.snapshotChanges().pipe(take(1)).subscribe(exp => xpObs.set(exp.payload.val() + quest.experience))

    let skillObs = this.database.object<any>('/users/' + user.$key + '/skills/' + quest.skill + '/experience')
    skillObs.snapshotChanges().pipe(take(1)).subscribe(exp => skillObs.set(exp.payload.val() + quest.experience))

    let skillXpObs = this.database.object<any>('/skills/' + quest.skill + '/teams/' + user.team + '/members/' + user.name + '/experience')
    skillXpObs.snapshotChanges().pipe(take(1)).subscribe(exp => skillXpObs.set(exp.payload.val() + quest.experience))
  }

  public computeTotalCategoryXP(userId: string, skillId: any) {
    return new Promise((resolve, reject) => {
      this.database
        .list('/users/' + userId + '/quests', ref => ref.orderByChild('skill').equalTo(skillId))
        .valueChanges()
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
    return this.database.list('/teams/' + teamName + '/quests').valueChanges()
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
    return this.database
      .list('/users/', ref => ref.orderByChild('team').equalTo(teamName))
      .valueChanges()
      .pipe(map((users: any) => {
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

    return this.database.list('/users/' + userId + '/quests').valueChanges()
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
      this.database.list('/users/' + userId + '/quests', ref => ref.orderByChild('createdOn').limitToLast(5)).valueChanges().subscribe(quests => resolve(quests))
    })
  }
}


// WEBPACK FOOTER //
// ./src/shared/services/quest.service.ts
