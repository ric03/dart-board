import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {PlayerOverviewComponent} from './components/player-overview/player-overview.component';
import {MatListModule} from '@angular/material/list';
import {CurrentPlayerProgressModule} from '../current-player-progress/current-player-progress.module';


@NgModule({
  declarations: [
    PlayerOverviewComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,

    CurrentPlayerProgressModule,

  ],
  exports: [
    PlayerOverviewComponent,
  ]
})
export class ScoreBoardModule {
}
