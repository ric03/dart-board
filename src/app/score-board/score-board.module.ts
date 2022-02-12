import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputComponent } from './output/output.component';
import { ScoreboardOverviewComponent } from './scoreboard-overview/scoreboard-overview.component';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 


@NgModule({
  declarations: [
    OutputComponent,
    ScoreboardOverviewComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    
  ],
  exports: [
    OutputComponent,
  ]
})
export class ScoreBoardModule { }
