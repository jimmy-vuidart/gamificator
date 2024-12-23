import { Component, Input } from '@angular/core'

@Component({
  selector: 'ranking',
  templateUrl: 'ranking.component.html',
  styleUrls: ['ranking.component.scss'],
  standalone: false,
})
export class RankingComponent {
  // Inputs
  @Input()
  rankingName: string
  @Input()
  spotCurrent: number
  @Input()
  spotMax: number

  // Processing variables
  spotPercent: number

  private ngOnChanges() {
    this.spotPercent = Math.floor(this.spotCurrent / this.spotMax * 100)
  }
}


// WEBPACK FOOTER //
// ./src/shared/components/ranking/ranking.component.ts
