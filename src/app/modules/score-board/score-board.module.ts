import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlayerOverviewComponent } from './components/player-overview/player-overview.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { MatListModule } from '@angular/material/list';
import { CurrentPlayerProgressModule } from '../current-player-progress/current-player-progress.module';


@NgModule({
  declarations: [
    PlayerOverviewComponent,
    ScoreboardComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,

    CurrentPlayerProgressModule,

  ],
  exports: [
    ScoreboardComponent,
  ]
})
export class ScoreBoardModule {
}
