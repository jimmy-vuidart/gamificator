import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {UserService} from "../../../shared/services/user.service";
import {QuestService} from "../../../shared/services/quest.service";
import {LibraryService} from "../../../shared/services/library.service";
import {SkillService} from "../../../shared/services/skill.service";

interface IQuest {

}

@Component({
    selector: 'quests',
    templateUrl: 'quests.component.html',
    styleUrls: ['quests.component.scss']
})
export class QuestComponent {

    private section: string;

    private projectQuests: any;
    private skillQuests: any;

    private teamQuests: any;

    constructor(private route: ActivatedRoute,
                private afAuth: AngularFireAuth,
                private skillService: SkillService,
                private userService: UserService,
                private questService: QuestService, ) {
        console.info('QuestComponent > constructor()');
    }

    ngOnInit() {
        this.route.params
            .subscribe(params => {
                this.section = params['section']; // (+) converts string 'id' to a number

            });
                // In a real app: dispatch action to load the details here.

        this.userService.getUserKey().subscribe((userId) => {
            this.projectQuests = this.questService.getUserQuestsByCategory(userId, 1)
                .map(LibraryService.forEachKeyMap(quest => this.skillService.getSkill(quest.skill).subscribe(skill => quest.loadedSkill = skill)))
            ;
            this.skillQuests = this.questService.getUserQuestsByCategory(userId, 2)
                .map(LibraryService.forEachKeyMap(quest => this.skillService.getSkill(quest.skill).subscribe(skill => quest.loadedSkill = skill)))
            ;
        });

        this.userService.getUserTeamNameObservable().subscribe((teamName) => {
            this.teamQuests = this.questService.getTeamQuests(teamName)
                .map(LibraryService.forEachKeyMap(quest => this.skillService.getSkill(quest.skill).subscribe(skill => quest.loadedSkill = skill)))
            ;
        });
    }
}



// WEBPACK FOOTER //
// ./src/app/user/quests/quests.component.ts