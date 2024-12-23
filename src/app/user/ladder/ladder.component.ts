import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {UserService} from "../../../shared/services/user.service";
import {TeamService} from "../../../shared/services/team.service";
import {Observable} from "rxjs/Observable";
import {SkillService} from "../../../shared/services/skill.service";
import {LibraryService} from "../../../shared/services/library.service";

@Component({
    selector: 'ladder',
    templateUrl: 'ladder.component.html',
    styleUrls: ['ladder.component.scss']
})
export class LadderComponent {
    // Work value
    public teams: Observable<any[]>;
    public skills: Observable<any[]>;

    public teamName;

    constructor(private teamService: TeamService, private skillService: SkillService, private user: UserService, private library: LibraryService) {
        console.debug('QuestComponent > constructor()');
    }

    ngOnInit() {
        console.debug('QuestComponent > ngOnInit()');

        this.teams = this.teamService.getTeams()
            .map(LibraryService.forEachKeyMap(t => t.experience = t.experience || 0))
            .map(LibraryService.orderByMap((t1, t2) => t1.experience < t2.experience));

        this.skills = this.skillService.getSkills()
            .map(skills => skills.filter(skill => skill.teams));

        this.user.getUserTeamNameObservable().subscribe(teamName => this.teamName = teamName);
    }

}



// WEBPACK FOOTER //
// ./src/app/user/ladder/ladder.component.ts