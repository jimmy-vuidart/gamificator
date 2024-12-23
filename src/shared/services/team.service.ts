import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {UserService} from "./user.service";
import {LibraryService} from "./library.service";
import {SkillService} from "./skill.service";
import {isUndefined} from "util";
import {QuestService} from "./quest.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TeamService {
    constructor(private skillService: SkillService,
                private questService: QuestService,
                private database: AngularFireDatabase,
                private auth: AngularFireAuth,
                private userService: UserService) {
    }

    public getTeams(): FirebaseListObservable<any[]> {
        return this.database.list("/teams");
    }

    public getCurrentTeam(): Observable<any> {
        return this.userService.getCurrentUser()
            .map(user => {
                return this.getTeam(user.team);
            })
            ;
    }

    public getTeamsXP(skill?, includeZero?): FirebaseListObservable<any[]> {

        if (includeZero == null) {
            includeZero = true;
        }

        return <FirebaseListObservable<any[]>>this.getTeams()
            .map(teams => {
                teams.forEach((team) => {
                    team.experience = 0;
                    Object.keys(team.quests).map(function (objectKey, index) {
                        let quest = team.quests[objectKey];
                        if (quest.completedOn && (!skill || quest.skill == skill)) {
                            team.experience += quest.experience;
                        }
                    });

                    this.getTeamMembers(team.$key).take(1).subscribe(members => {
                        LibraryService.forEachKey(members, member => {
                            this.userService.getUserXP(member.$key, skill).subscribe(xp => {
                                team.experience += xp;
                            });
                        });
                    });
                });
                return teams;
            })
            .map(teams => {
                if (!includeZero) {
                    teams = teams.filter(team => team.experience > 0);
                }
                return teams;
            });
    }

    public getTeam(teamName: any): Observable<any> {
        console.info("TeamService > getTeam(", teamName, ")");

        return this.database.object("/teams/" + teamName);
    }

    public getTeamMembers(teamName): Observable<any> {
        console.info("TeamService > getTeamMembers(", teamName, ")");

        return this.database
            .list("/users", {
                query: {
                    orderByChild: 'team',
                    equalTo: teamName
                }
            })
            .map(users => users.filter(user => !user.admin))
            ;
    }

    public getTeamLatestQuests(teamName): Observable<any> {
        console.debug("TeamService > getTeamLatestQuests", teamName);

        let obs1 = this.questService.getTeamQuests(teamName);
        let obs2 = this.questService.getTeamMembersQuests(teamName);

        return obs1.switchMap(quests => {
            return obs2.switchMap(quests2 => {
                return Observable.of(quests.concat(quests2))
                    .map(LibraryService.orderByMap((q1, q2) => q1.createdOn < q2.createdOn))
                    .map(LibraryService.limitByMap(5))
                    .map(LibraryService.outputMap("After filter and sort for latest assigned"));
            });
        });
    }

    public getTeamLatestCompletedQuests(teamName): Observable<any> {
        console.debug("TeamService > getTeamLatestQuests", teamName);

        let obs1 = this.questService.getTeamQuests(teamName);
        let obs2 = this.questService.getTeamMembersQuests(teamName);

        return obs1.switchMap(quests => {
            return obs2.switchMap(quests2 => {
                return Observable.of(quests.concat(quests2))
                    .map(LibraryService.filterMap(q1 => q1.completedOn))
                    .map(LibraryService.orderByMap((q1, q2) => q1.createdOn < q2.createdOn))
                    .map(LibraryService.limitByMap(5))
                    .map(LibraryService.outputMap("After filter and sort for recent completed"));
            });
        });
    }
}



// WEBPACK FOOTER //
// ./src/shared/services/team.service.ts