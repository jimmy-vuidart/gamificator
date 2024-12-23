

import {Injectable} from "@angular/core";

declare var $:any;

@Injectable()
export class NotificationService {
    public displayNotif(type, from, align, message) {
        $.notify({
            icon: "notifications",
            message: message

        },{
            type: type,
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
    }
}



// WEBPACK FOOTER //
// ./src/shared/services/notification.service.ts