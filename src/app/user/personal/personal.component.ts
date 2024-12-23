import { Component } from '@angular/core'
import * as Chartist from 'chartist'
import { LineChart, PieChart } from 'chartist'
import { map } from 'rxjs'
import { LibraryService } from '../../../shared/services/library.service'
import { QuestService } from '../../../shared/services/quest.service'
import { SkillService } from '../../../shared/services/skill.service'
import { UserService } from '../../../shared/services/user.service'

interface IUser {
  name: string;
}

@Component({
  selector: 'personal',
  templateUrl: 'personal.component.html',
  styleUrls: ['personal.component.scss'],
  standalone: false,
})
export class PersonalComponent {

  questsLatestCompleted: any
  questsLatestAssigned: any

  skills: any

  currentXp: number
  currentLevel: number

  constructor(private userService: UserService, private questService: QuestService, private skillService: SkillService) {

  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {

      this.questsLatestCompleted = this.questService.getUserQuests(user.$key).pipe(
        map(LibraryService.filterMap(quest => quest.completedOn)),
        map(LibraryService.orderByMap((quest1, quest2) => quest1.completedOn < quest2.completedOn)),
        map(LibraryService.limitByMap(5)),
        map(LibraryService.outputMap('Latest completed quests')),
      )


      this.questsLatestAssigned = this.questService.getUserQuests(user.$key).pipe(
        map(LibraryService.filterMap(quest => !quest.completedOn)),
        map(LibraryService.orderByMap((quest1, quest2) => quest1.createdOn < quest2.createdOn)),
        map(LibraryService.limitByMap(5)),
        map(LibraryService.outputMap('Latest assigned quests')),
      )


      this.currentXp = user.experience
      this.currentLevel = Math.floor(this.currentXp / 500)

      this.buildPieChart('xpChart', this.currentXp % 500)

      this.skillService.getSkills().subscribe(skills => {
        console.log('Current skills', skills)
        skills = skills.filter(skill => skill.teams && skill.teams.hasOwnProperty(user.team) && skill.teams[user.team].members && skill.teams[user.team].members.hasOwnProperty(user.name))
        skills.forEach(skill => skill.experience = skill.teams[user.team].members[user.name].experience)
        this.skills = skills
      })
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
// ./src/app/user/personal/personal.component.ts
