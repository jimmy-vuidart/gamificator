import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { map, mergeMap, Observable, of, switchMap, take } from 'rxjs'
import { LibraryService } from './library.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private database: AngularFireDatabase, private auth: AngularFireAuth) {
  }

  public getUserKey() {
    return this.auth.authState
      .pipe(map(state => state?.uid))
  }

  public getUserTeamNameObservable() {
    return this.auth.authState
      .pipe(mergeMap((state) => {
        return this.database.object('/users/' + state?.uid).valueChanges()
          .pipe(map((user: any) => user?.team))
      }))
  }

  public getCurrentUser(): Observable<any> {
    return this.auth.authState.pipe(
      switchMap((state) => {
        if (state) {
          return this.database.object('/users/' + state.uid).valueChanges()
        } else {
          return of(null)
        }
      }))
  }

  public getUser(userId) {
    return this.database.object('/users/' + userId)
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
      return this.database.object('/teams/' + teamName).valueChanges()
    }))
  }

  public getUserTeamMembersName(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.getUserTeamName().then((teamName) => {
        // Fetching users
        this.database
          .list('/users', ref => ref.orderByChild('team').equalTo(teamName))
          .valueChanges()
          .subscribe((teamMembers) => {
            resolve(teamMembers)
          })
      })
    })
  }

  public toggleAdmin() {
    let userSub = this.getCurrentUser()
    userSub.pipe(take(1)).subscribe((user) => {
      this.database.object('/users/' + user.$key).update({admin: !user.admin})
      window.location.reload()
    })
  }

  public getUserXP(userId: string, skill?) {
    return this.database.list('/users/' + userId + '/quests').valueChanges()
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


// WEBPACK FOOTER //
// ./src/shared/services/user.service.ts
