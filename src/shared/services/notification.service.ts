import { Injectable } from '@angular/core'

declare var $: any

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public displayNotif(type: string, from: string, align: string, message: string) {
    $.notify({
      icon: 'notifications',
      message: message,

    }, {
      type: type,
      timer: 4000,
      placement: {
        from: from,
        align: align,
      },
    })
  }
}


// WEBPACK FOOTER //
// ./src/shared/services/notification.service.ts
