import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScoreboardOverviewComponent} from './components/player-overview/scoreboard-overview.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIcon} from "@angular/material/icon";


@NgModule({
  declarations: [
    ScoreboardOverviewComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatIcon,
  ],
  exports: [
    ScoreboardOverviewComponent,
  ]
})
export class ScoreBoardModule {
}
