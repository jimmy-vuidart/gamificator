import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestService} from "../../services/quest.service";
import {User} from "firebase/app";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'quest-card',
    templateUrl: 'quest-card.component.html',
    styleUrls: ['quest-card.component.scss']
})
export class QuestCardComponent {
    @Input()
    public quest: any;
    @Input()
    public isAdmin: boolean;

    @Output()
    public completed: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    ngOnInit() {
        // this.userService.isAdmin()
        //     .then((isAdmin) => this.isAdmin = isAdmin)
        //     .catch(() => {});
    }

    public onResolveClick() {
        this.completed.emit();
    }
}



// WEBPACK FOOTER //
// ./src/shared/components/quest-card/quest-card.component.ts