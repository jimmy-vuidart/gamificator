
import {Component} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {TeamService} from "../../../shared/services/team.service";
import {UserService} from "../../../shared/services/user.service";
import {Observable} from "rxjs/Observable";
import {LibraryService} from "../../../shared/services/library.service";

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
    private team: Observable<any>;

    private teamLatestQuests: Observable<any>;
    private teamLatestDoneQuests: Observable<any>;

    constructor(private teamService: TeamService, private userService: UserService) {

    }

    ngOnInit() {
        this.userService.getUserTeamNameObservable()
            .subscribe(teamName => {
                console.log("Team name ? ", teamName);
                this.team = this.teamService.getTeam(teamName);

                this.teamLatestQuests = this.teamService.getTeamLatestQuests(teamName)
                    .map(LibraryService.filterMap(q => !q.completedOn))
                    .map(LibraryService.orderByMap((q1, q2) => q1.createdOn < q2.completedOn));
                this.teamLatestDoneQuests = this.teamService.getTeamLatestCompletedQuests(teamName);
            });

    }
}



// WEBPACK FOOTER //
// ./src/app/admin/dashboard/dashboard.component.ts