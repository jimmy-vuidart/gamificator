import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {UserService} from "../../../shared/services/user.service";
import {TeamService} from "../../../shared/services/team.service";
import {Observable} from "rxjs/Observable";
import {SkillService} from "../../../shared/services/skill.service";
import * as Chartist from "Chartist";
import {LibraryService} from "../../../shared/services/library.service";

@Component({
    selector: 'team-ladder',
    templateUrl: 'team-ladder.component.html',
    styleUrls: ['team-ladder.component.scss']
})
export class TeamLadderComponent {
    // Template values
    public teamMembers: Observable<any>;
    public skills: Observable<any>;

    public teamName;

    // Work value
    public teams: FirebaseListObservable<any[]>;

    // Library service
    public library: LibraryService;

    @ViewChild('chartTarget')
    private chartTarget: ElementRef;


    constructor(private teamService: TeamService, private skillService: SkillService, private userService: UserService, libraryService: LibraryService) {
        console.debug('QuestComponent > constructor()');

        this.library = libraryService;
    }

    ngOnInit() {
        console.debug('QuestComponent > ngOnInit()');

        this.userService.getUserTeamNameObservable().subscribe((teamName) => {
            this.teamName = teamName;

            this.teamMembers = this.teamService.getTeamMembers(teamName)
                .map(members => {
                    members.forEach(member => member.level = Math.floor(member.experience || 0 / 500));
                    return members;
                })
                .map(LibraryService.outputMap("Before sort"))
                .map(LibraryService.orderByMap((m1, m2) => (m1.experience || 0) < (m2.experience || 0)));

            this.skills = this.skillService.getSkills()
                .map(skills => skills.filter(skill => skill.teams));
        });
    }


}



// WEBPACK FOOTER //
// ./src/app/admin/team-ladder/team-ladder.component.ts