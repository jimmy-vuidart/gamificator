import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Injectable()
export class SkillService {
    constructor(private database: AngularFireDatabase, private auth: AngularFireAuth) {
    }

    public getSkills() {
        return this.database.list("/skills");
    }

    public getSkill(skillKey) {
        return this.database.object("/skills/" + skillKey);
    }
}



// WEBPACK FOOTER //
// ./src/shared/services/skill.service.ts