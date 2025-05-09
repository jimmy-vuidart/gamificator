import { Component } from '@angular/core'
import { LineChart, PieChart } from 'chartist'
import * as Chartist from 'chartist'
import { map } from 'rxjs'
import { LibraryService } from '../../../shared/services/library.service'
import { QuestService } from '../../../shared/services/quest.service'
import { UserService } from '../../../shared/services/user.service'
import { NgFor, AsyncPipe } from '@angular/common';

interface IUser {
  name: string;
}

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    imports: [NgFor, AsyncPipe],
})
export class HomeComponent {

  currentXp: any
  currentLevel: any

  questsLatest: any
  questsTeamLatest: any

  constructor(private userService: UserService, private questService: QuestService) {

  }

  ngOnInit() {
    this.userService.getUserTeam().subscribe(team => {
      this.questsTeamLatest = this.questService.getFullTeamQuests(team.$key).pipe(
        map(LibraryService.filterMap(q => q.completedOn)),
        map(LibraryService.orderByMap((q1, q2) => q1.createdOn < q2.createdOn)),
        map(LibraryService.limitByMap(5)),
      )
    })

    this.userService.getCurrentUser().subscribe(user => {
      this.currentXp = this.userService.getUserXP(user.$key)

      this.questsLatest = this.questService.getUserLatestQuests(user.$key)

      this.currentXp = user.experience
      this.currentLevel = Math.floor(this.currentXp / 500)

      this.buildPieChart('xpChart', this.currentXp % 500)
    })

    let dataCompletedTasksChart = {
      labels: ['Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [230, 750, 450, 300, 280],
      ],
    }
    let optionsCompletedTasksChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
    }
    let completedTasksChart = new LineChart('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart)


    // start animation for the Completed Tasks Chart - Line Chart
    // md.startAnimationForLineChart(completedTasksChart);
  }

  private buildPieChart(idClass, experience) {
    new PieChart('#' + idClass, {
      labels: ['100', ' '],
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
// ./src/app/user/home/home.component.ts
