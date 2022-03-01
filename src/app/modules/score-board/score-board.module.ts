import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {OutputComponent} from './output/output.component';
import {ScoreboardOverviewComponent} from './scoreboard-overview/scoreboard-overview.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';


@NgModule({
  declarations: [
    OutputComponent,
    ScoreboardOverviewComponent,
    ScoreboardComponent,
  ],
  imports: [
    CommonModule,

    MatCardModule,
    MatProgressBarModule,
  ],
  exports: [
    ScoreboardComponent,
  ]
})
export class ScoreBoardModule {
}
