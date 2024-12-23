import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { PieChart } from 'chartist'
import * as Chartist from 'chartist'

@Component({
  selector: 'level',
  templateUrl: 'level.component.html',
  styleUrls: ['level.component.scss'],
  standalone: false,
})
export class LevelComponent {

  @Input()
  experience: number

  @ViewChild('chartTarget')
  chartTarget: ElementRef

  level: number
  experienceAtLevel: number

  ngOnChanges() {
    this.level = Math.floor(this.experience / 500)
    this.experienceAtLevel = this.experience % 500

    this.buildPieChart()

    this.buildPieChart()
  }

  private buildPieChart() {
    new PieChart(this.chartTarget.nativeElement, {
      series: [this.experienceAtLevel, 500 - this.experienceAtLevel],
    }, {
      donut: true,
      donutWidth: 12,
      startAngle: 270,
      showLabel: false,
    })
  }
}

