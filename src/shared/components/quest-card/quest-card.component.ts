import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UserService } from '../../services/user.service'
import { NgClass, NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'quest-card',
    templateUrl: 'quest-card.component.html',
    styleUrls: ['quest-card.component.scss'],
    imports: [
        NgClass,
        NgIf,
        DatePipe,
    ],
})
export class QuestCardComponent implements OnInit {
  @Input()
  public quest: any
  @Input()
  public isAdmin: boolean

  @Output()
  public completed: EventEmitter<any> = new EventEmitter()

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.isCurrentUserAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin
    })
  }

  public onResolveClick() {
    this.completed.emit()
  }
}


// WEBPACK FOOTER //
// ./src/shared/components/quest-card/quest-card.component.ts
