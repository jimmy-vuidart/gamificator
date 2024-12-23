import {Component} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {AngularFireDatabase} from "angularfire2/database";
import {QuestService} from "../../../shared/services/quest.service";
import {TeamService} from "../../../shared/services/team.service";
import {Observable} from "rxjs/Observable";
import {LibraryService} from "../../../shared/services/library.service";
import {SkillService} from "../../../shared/services/skill.service";

@Component({
    selector: 'admin-quests',
    templateUrl: 'admin-quests.component.html',
    styleUrls: ['admin-quests.component.scss']
})
export class AdminQuestComponent {
    private teamName;

    private usersWithQuests;
    private teamQuests: Observable<any>;

    constructor(private questService: QuestService,
                private userService: UserService,
                private teamService: TeamService,
                private skillService: SkillService) {
    }

    ngOnInit() {
        // TODO: should be a resolve
        this.userService.getUserTeamNameObservable().subscribe((teamName) => {
            this.teamName = teamName;

            // Fetching those quests as iterable maps
            this.teamService.getTeamMembers(teamName).subscribe(members => {
                this.usersWithQuests = [];
                LibraryService.forEachKey(members, member => {
                    this.questService.getUserQuests(member.$key)
                        .map(LibraryService.outputMap("Before adding loaded skills"))
                        .map(LibraryService.forEachKeyMap(quest => this.skillService.getSkill(quest.skill).subscribe(skill => quest.loadedSkill = skill)))
                        .map(LibraryService.outputMap("After adding loaded skills"))
                        .subscribe(quests => {
                            member.loadedQuests = quests;
                            this.usersWithQuests.push(member);
                        });
                });
            });


            this.teamQuests = this.questService.getTeamQuests(teamName)
                .map(LibraryService.forEachKeyMap(quest => this.skillService.getSkill(quest.skill).subscribe(skill => quest.loadedSkill = skill)))
            ;
        });
    }

    public onQuestCompleted(quest, user) {
        this.questService.completeQuest(quest, user);
    }

    public onTeamQuestCompleted(quest) {
        this.questService.completeTeamQuest(quest, this.teamName);
    }
}



// WEBPACK FOOTER //
// ./src/app/admin/quests/admin-quests.component.ts