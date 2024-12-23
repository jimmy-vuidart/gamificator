import {Injectable}     from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/Rx';
import {UserService} from "./user.service";
import {IPromise} from "q";
import {AngularFireDatabase} from "angularfire2/database";
import {LibraryService} from "./library.service";
import {SkillService} from "./skill.service";
import {CategoryService} from "./category.service";
import {Observable} from "rxjs/Observable";
import {Promise} from "firebase/app";

export interface IQuest {
    $key: string,
    title: string,
    experience: number,
    user: string,
    skill: any,
    category: string,
    createdOn: number
}

@Injectable()
export class QuestService {

    constructor(private database: AngularFireDatabase,
                private skillService: SkillService,
                private userService: UserService,
                private categoryService: CategoryService) {
    }

    public postQuest(quest: IQuest): Promise<any> {
        quest.createdOn = Date.now();
        if (quest.user) {
            return this.database.list("/users/" + quest.user + "/quests").push(quest);
        }
        else {
            return this.userService.getUserTeamName().then((teamName) => {
                return this.database.list("/teams/" + teamName + "/quests").push(quest);
            });
        }
    }

    private incrementTeamXp(quest, teamName) {
        let teamXpObs = this.database.object("/teams/" + teamName + "/experience");
        teamXpObs.take(1).subscribe(exp => teamXpObs.set(exp.$value + quest.experience));

        let teamSkillObs = this.database.object("/teams/" + teamName + "/skills/" + quest.skill + "/experience");
        teamSkillObs.take(1).subscribe(exp => teamSkillObs.set(exp.$value + quest.experience));

        let skillTeamObs = this.database.object("/skills/" + quest.skill + "/teams/" + teamName + "/experience");
        skillTeamObs.take(1).subscribe(exp => skillTeamObs.set(exp.$value + quest.experience));
    }

    public completeTeamQuest(quest: IQuest, teamName: any){
        console.debug("QuestService > completeTeamQuest", quest, teamName);

        this.database.object("/teams/" + teamName + "/quests/" + quest.$key + "/completedOn").set(Date.now());

        this.incrementTeamXp(quest, teamName);
    }

    public completeQuest(quest: IQuest, user) {
        console.debug("QuestService > completeQuest");
        console.debug(quest);
        console.debug(user);

        // Writing everywhere to ease reading
        this.incrementTeamXp(quest, user.team);

        this.database.object("/users/" + user.$key + "/quests/" + quest.$key + "/completedOn").set(Date.now());

        let xpObs = this.database.object("/users/" + user.$key + "/experience");
        xpObs.take(1).subscribe(exp => xpObs.set(exp.$value + quest.experience));

        let skillObs = this.database.object("/users/" + user.$key + "/skills/" + quest.skill + "/experience");
        skillObs.take(1).subscribe(exp => skillObs.set(exp.$value + quest.experience));

        let skillXpObs = this.database.object("/skills/" + quest.skill + "/teams/" + user.team + "/members/" + user.name + "/experience");
        skillXpObs.take(1).subscribe(exp => skillXpObs.set(exp.$value + quest.experience));
    }

    public computeTotalCategoryXP(userId: string, skillId: any) {
        return new Promise((resolve, reject) => {
            this.database
                .list("/users/" + userId + "/quests", {
                    query: {orderByChild: "skill", equalTo: skillId}
                })
                .subscribe((quests) => {
                    let result = 0;
                    for (let i in quests) {
                        result += quests[i].experience;
                    }
                    resolve(result)
                })
        });
    }

    public getTeamQuests(teamName): Observable<any> {
        return this.database.list("/teams/" + teamName + "/quests");
    }

    public getFullTeamQuests(teamName): Observable<any> {
        let obs1 = this.getTeamQuests(teamName);
        let obs2 = this.getTeamMembersQuests(teamName);

        return obs1.switchMap(quests => {
            return obs2.switchMap(quests2 => {
                return Observable.of(quests.concat(quests2));
            });
        });

    }

    public getTeamMembersQuests(teamName) {
        return this.database
            .list("/users/", {
                query: {orderByChild: 'team', equalTo: teamName}
            })
            .map(users => {
                let quests = [];

                LibraryService.forEachKey(users, user => {
                    if (user.quests) {
                        LibraryService.forEachKey(user.quests, (quest) => {
                            quest.user = user.name;
                            quests.push(quest);
                        });
                    }
                });
                return quests;
            });
    }

    public getUserQuests(userId) {
        console.debug("QuestService > getUserQuests", userId);

        return this.database.list("/users/" + userId + "/quests");
    }

    public getUserQuestsByCategory(userId, category) {
        console.debug("QuestService > getUserQuestsByCategory", userId, category);

        return this.getUserQuests(userId)
            .map((quests) => {
                quests = quests.filter(quest => {
                    return quest.category === category
                });
                return quests;
            });
    }

    public getUserLatestQuests(userId) {
        return new Promise((resolve, reject) => {
            this.database.list("/users/" + userId + "/quests", {query: {orderByChild: 'createdOn', limitToLast: 5}}).subscribe(quests => resolve(quests));
        });
    }
}




// WEBPACK FOOTER //
// ./src/shared/services/quest.service.ts