import { Injectable } from '@angular/core'
import { Auth, authState, User } from '@angular/fire/auth'
import { Database, equalTo, list, listVal, objectVal, orderByChild, query, ref, set } from '@angular/fire/database'
import { map, mergeMap, Observable, of, switchMap, take } from 'rxjs'
import { LibraryService } from './library.service'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authState$: Observable<User | null>

  constructor(private database: Database, private auth: Auth) {
    this.authState$ = authState(this.auth)
  }

  public getUserKey() {
    return this.authState$
      .pipe(map(state => state?.uid))
  }

  public getUserTeamNameObservable() {
    return this.authState$
      .pipe(mergeMap((state) => {
        return objectVal<any>(ref(this.database, `/users/${state?.uid}`))
          .pipe(map((user: any) => user?.team))
      }))
  }

  public getCurrentUser(): Observable<any> {
    return this.authState$.pipe(
      switchMap((state) => {
        if (state) {
          return objectVal<any>(ref(this.database, `/users/${state.uid}`), {keyField: '$key'})
        } else {
          return of(null)
        }
      }))
  }

  public getUser(userId) {
    return objectVal<any>(ref(this.database, '/users/' + userId))
  }

  public isCurrentUserAdmin(): Observable<boolean> {
    this.getCurrentUser().pipe(take(1))
      .subscribe(user => console.log('Current user :', user))
    return this.getCurrentUser().pipe(take(1), map(user => user.admin))
  }

  public getUserTeamName(): Promise<string> {
    return new Promise((resolve, reject) => {
      return this.getCurrentUser()
        .subscribe((user) => {
          resolve(user.team)
        })
    })
  }

  public getUserTeam(): Observable<any> {
    return this.getUserTeamNameObservable().pipe(switchMap((teamName) => {
      return objectVal(ref(this.database, `/teams/${teamName}`))
    }))
  }

  public getUserTeamMembersName(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.getUserTeamName().then((teamName) => {
        // Fetching users
        listVal<any>(query(ref(this.database, '/users'), orderByChild('team'), equalTo(teamName)))
          .subscribe((teamMembers) => {
            resolve(teamMembers)
          })
      })
    })
  }

  public toggleAdmin() {
    let userSub = this.getCurrentUser()
    userSub.pipe(take(1)).subscribe((user) => {
      set(ref(this.database, `/users/${user.$key}`), {admin: !user.admin})
      window.location.reload()
    })
  }

  public getUserXP(userId: string, skill?) {
    return listVal(ref(this.database, `/users/${userId}/quests`))
      .pipe(map(quests => {
        let experience = 0
        LibraryService.forEachKey(quests, quest => {
          if (quest.completed && (!skill || quest.skill == skill)) {
            experience += quest.experience
          }

        })
        return experience
      }))
  }
}
