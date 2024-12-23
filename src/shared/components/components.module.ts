import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { LevelComponent } from './level/level.component'
import { LoadingComponent } from './loading/loading.component'
import { NavbarComponent } from './navbar/navbar.component'
import { QuestCardComponent } from './quest-card/quest-card.component'
import { RankingComponent } from './ranking/ranking.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { SkillComponent } from './skill/skill.component'

const MODULES = [
  SkillComponent,
  LevelComponent,
  LoadingComponent,
  RankingComponent,
  QuestCardComponent,
  SidebarComponent,
  NavbarComponent,
]

@NgModule({
    imports: [CommonModule, BrowserModule, RouterModule, FormsModule, ...MODULES],
    exports: MODULES,
    providers: [],
})
export class ComponentsModule {

}
