import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { PieChart } from 'chartist'
import { LibraryService } from '../../services/library.service'

@Component({
  selector: 'skill',
  templateUrl: 'skill.component.html',
  styleUrls: ['skill.component.scss'],
  standalone: false,
})
export class SkillComponent {

  @Input()
  skill: any

  @ViewChild('chartTarget')
  private chartTarget: ElementRef

  // Template var
  moduleId = LibraryService.makeid()
  level: number

  ngOnChanges() {
    this.level = Math.floor(this.skill.experience / 500)

    this.buildPieChart(this.moduleId, this.skill.experience % 500)
  }

  private buildPieChart(idClass, experience) {
    new PieChart(this.chartTarget.nativeElement, {
      series: [experience, 500 - experience],
    }, {
      donut: true,
      donutWidth: 12,
      startAngle: 270,
      showLabel: false,
    })
  }
}


// WEBPACK FOOTER //
// ./src/shared/components/skill/skill.component.ts
