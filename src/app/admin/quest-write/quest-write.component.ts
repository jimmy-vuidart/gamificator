import { Component } from '@angular/core'
import { NotificationService } from '../../../shared/services/notification.service'
import { QuestService } from '../../../shared/services/quest.service'
import { SkillService } from '../../../shared/services/skill.service'
import { TeamService } from '../../../shared/services/team.service'

@Component({
  selector: 'quest-list',
  templateUrl: 'quest-write.component.html',
  styleUrls: ['quest-write.component.scss'],
  standalone: false,
})
export class QuestWriteComponent {
  public sendInProgress

  public newQuest: any
  public teamMembers: any

  public skills: any[]
  isForTeam: boolean

  constructor(private skillService: SkillService,
              private questService: QuestService,
              private teamService: TeamService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.newQuest = {}

    this.teamService.getCurrentTeam().subscribe(team => {
      this.teamMembers = this.teamService.getTeamMembers(team.$key)
    })

    this.skillService.getSkills().subscribe(skills => this.skills = skills)
  }

  public postQuest() {
    if (this.sendInProgress) return

    this.sendInProgress = true
    this.newQuest.category = this.skills.find(skill => skill.$key == this.newQuest.skill).category

    this.questService.postQuest(this.newQuest)
      .then(() => {
        this.newQuest = {}
        this.notificationService.displayNotif('success', 'bottom', 'right', 'Quête crée avec succès')

        this.sendInProgress = false
      })
      .catch(error => this.sendInProgress = false)
  }
}


// WEBPACK FOOTER //
// ./src/app/admin/quest-write/quest-write.component.ts
