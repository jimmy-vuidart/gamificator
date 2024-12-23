import {Injectable}     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {LibraryService} from "./library.service";

@Injectable()
export class UserService {

    constructor(private database: AngularFireDatabase, private auth: AngularFireAuth) {
    }

    public getUserKey() {
        return this.auth.authState
            .map(state => state.uid);
    }

    public getUserTeamNameObservable() {
        return this.auth.authState
            .flatMap((state) => {
                return this.database.object("/users/" + state.uid)
                    .map(user => user.team);
            });
    }

    public getCurrentUser(): Observable<any> {
        return this.auth.authState
                .switchMap((state) => {
                    if (state) {
                        return this.database.object("/users/" + state.uid);
                    }
                    else {
                        return Observable.of(null);
                    }
                });
    }

    public getUser(userId) {
        return this.database.object("/users/" + userId);
    }

    public isCurrentUserAdmin(): Observable<boolean> {
        this.getCurrentUser().take(1)
            .subscribe(user => console.log("Current user :", user))
        return this.getCurrentUser().take(1).map(user => user.admin);
    }

    public getUserTeamName(): Promise<string> {
        return new Promise((resolve, reject) => {
            return this.getCurrentUser()
                .subscribe((user) => {
                    resolve(user.team);
                });
        });
    }

    public getUserTeam(): Observable<any> {
        return this.getUserTeamNameObservable().switchMap((teamName) => {
                return this.database.object("/teams/" + teamName);
        });
    }

    public getUserTeamMembersName(): Promise<any> {

        return new Promise((resolve, reject) => {
            this.getUserTeamName().then((teamName) => {
                // Fetching users
                this.database
                    .list("/users", {
                        query: {orderByChild: 'team', equalTo: teamName}
                    })
                    .subscribe((teamMembers) => {
                        resolve(teamMembers);
                    });
            })
        });
    }

    public toggleAdmin() {
        let userSub = this.getCurrentUser();
        userSub.take(1).subscribe((user) => {
            this.database.object("/users/" + user.$key).update({admin: !user.admin});
            window.location.reload();
        });
    }

    public getUserXP(userId: string, skill?) {
        return this.database.list("/users/" + userId + "/quests")
            .map(quests => {
                let experience = 0;
                LibraryService.forEachKey(quests, quest => {
                    if(quest.completed && (!skill || quest.skill == skill)) {
                        experience += quest.experience
                    }

                });
                return experience;
            });
    }
}




// WEBPACK FOOTER //
// ./src/shared/services/user.service.ts