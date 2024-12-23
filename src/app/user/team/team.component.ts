import { Component } from '@angular/core'
import { Interpolation, LineChart, PieChart } from 'chartist'
import { map } from 'rxjs/operators'
import { LibraryService } from '../../../shared/services/library.service'
import { QuestService } from '../../../shared/services/quest.service'
import { SkillService } from '../../../shared/services/skill.service'
import { UserService } from '../../../shared/services/user.service'

interface IUser {
  name: string;
}

@Component({
  selector: 'team',
  templateUrl: 'team.component.html',
  styleUrls: ['team.component.scss'],
  standalone: false,
})
export class TeamComponent {

  questsLatestCompleted: any
  questsLatestAssigned: any

  currentXp: number = 0
  currentLevel: number = 0

  skills: any[] = []

  constructor(private userService: UserService, private skillService: SkillService, private questService: QuestService) {

  }

  ngOnInit() {
    this.userService.getUserTeam().subscribe(team => {
      this.questsLatestCompleted = this.questService.getFullTeamQuests(team.$key).pipe(
        map(LibraryService.filterMap(quest => quest.completedOn)),
        map(LibraryService.orderByMap((quest1, quest2) => quest1.completedOn < quest2.completedOn)),
        map(LibraryService.limitByMap(5)),
        map(LibraryService.outputMap('Latest completed quests')),
      )

      this.questsLatestAssigned = this.questService.getFullTeamQuests(team.$key).pipe(
        map(LibraryService.filterMap(quest => !quest.completedOn)),
        map(LibraryService.orderByMap((quest1, quest2) => quest1.createdOn < quest2.createdOn)),
        map(LibraryService.limitByMap(5)),
        map(LibraryService.outputMap('Latest assigned quests')),
      )

      this.currentXp = team.experience
      this.currentLevel = Math.floor(this.currentXp / 500)


      this.skillService.getSkills().subscribe((skills: any[]) => {
        console.log('Current skills', skills)
        skills = skills.filter(skill => skill.teams && skill.teams.hasOwnProperty(team.$key))
        skills.forEach(skill => skill.experience = skill.teams[team.$key].experience)
        this.skills = skills
      })

      this.buildPieChart('xpChart', this.currentXp % 500)
    })

    {
      let dataCompletedTasksChart = {
        labels: ['Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [800, 700, 150, 400, 1200],
        ],
      }
      let optionsCompletedTasksChart = {
        lineSmooth: Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 2000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
      }
      let completedTasksChart = new LineChart('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart)
    }

    {
      let dataCompletedTasksChart = {
        labels: ['Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [],
          {name: 'Roger LOOSER', data: [200, 500, 150, 450, 300]},
          {name: 'Jimmy VUIDART', data: [600, 650, 600, 400, 500]},
          {name: 'Jack WINNER', data: [800, 700, 750, 50, 1200]},
        ],
      }
      let optionsCompletedTasksChart = {
        lineSmooth: Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 1500, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
      }
      let completedTasksChart = new LineChart('#everyoneChart', dataCompletedTasksChart, optionsCompletedTasksChart)
    }


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
// ./src/app/user/team/team.component.ts
