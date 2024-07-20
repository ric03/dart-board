import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {PlayerOverviewComponent} from './components/player-overview/player-overview.component';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
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
