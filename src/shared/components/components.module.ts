import {LoadingComponent} from "./loading/loading.component";
import {RankingComponent} from "./ranking/ranking.component";
import {SkillComponent} from "./skill/skill.component";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {QuestCardComponent} from "./quest-card/quest-card.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {LevelComponent} from "./level/level.component";

const MODULES =  [
    SkillComponent,
    LevelComponent,
    LoadingComponent,
    RankingComponent,
    QuestCardComponent,
    SidebarComponent,
    NavbarComponent
];

@NgModule({
    declarations: MODULES,
    imports: [CommonModule, BrowserModule, RouterModule, FormsModule],
    exports: MODULES,
    providers: []
})
export class ComponentsModule {

}



// WEBPACK FOOTER //
// ./src/shared/components/components.module.ts