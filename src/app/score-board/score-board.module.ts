import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputComponent } from './output/output.component';
import { ScoreboardOverviewComponent } from './scoreboard-overview/scoreboard-overview.component';



@NgModule({
  declarations: [
    OutputComponent,
    ScoreboardOverviewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OutputComponent,
  ]
})
export class ScoreBoardModule { }
