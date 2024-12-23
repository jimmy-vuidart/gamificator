import {Component, Input} from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.scss']
})
export class LoadingComponent {

  // Inputs
  @Input()
  public label: string;

  constructor() {
  }
}
