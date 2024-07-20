import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PlayerOverviewComponent} from './components/player-overview/player-overview.component';
import {CurrentPlayerProgressModule} from '../current-player-progress/current-player-progress.module';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";


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
