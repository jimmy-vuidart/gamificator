import {Component, Input} from '@angular/core';

@Component({
    selector: 'ranking',
    templateUrl: 'ranking.component.html',
    styleUrls: ['ranking.component.scss']
})
export class RankingComponent {
    // Inputs
    @Input()
    private rankingName: string;
    @Input()
    private spotCurrent: number;
    @Input()
    private spotMax: number;

    // Processing variables
    private spotPercent: number;

    private ngOnChanges() {
        this.spotPercent = Math.floor(this.spotCurrent / this.spotMax * 100);
    }
}



// WEBPACK FOOTER //
// ./src/shared/components/ranking/ranking.component.ts