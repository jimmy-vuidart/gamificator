import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import * as Chartist from "chartist";
import {LibraryService} from "../../services/library.service";

@Component({
    selector: 'level',
    templateUrl: 'level.component.html',
    styleUrls: ['level.component.scss']
})
export class LevelComponent {

    @Input()
    private experience: number;

    @ViewChild('chartTarget')
    private chartTarget: ElementRef;

    private level: number;
    private experienceAtLevel: number;

    ngOnChanges() {
        this.level = Math.floor(this.experience / 500);
        this.experienceAtLevel = this.experience % 500;

        this.buildPieChart();

        this.buildPieChart();
    }

    private buildPieChart() {
        new Chartist.Pie(this.chartTarget.nativeElement, {
            series: [this.experienceAtLevel, 500 - this.experienceAtLevel]
        }, {
            donut: true,
            donutWidth: 12,
            startAngle: 270,
            showLabel: false
        });
    }
}

