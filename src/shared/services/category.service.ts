import {Injectable}     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {UserService} from "./user.service";
import {IPromise} from "q";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Injectable()
export class CategoryService {

    constructor(private database: AngularFireDatabase) {
    }
}




// WEBPACK FOOTER //
// ./src/shared/services/category.service.ts