import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CricketBoardComponent} from './cricket-board/cricket-board.component';
import {InputButtonRowCricketComponent} from './components/input-button-row-cricket/input-button-row-cricket.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRippleModule} from '@angular/material/core';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {GameSelectionModule} from '../game-selection/game-selection.module';
import {CricketOverviewTableComponent} from './components/cricket-overview-table/cricket-overview-table.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {CurrentPlayerProgressModule} from '../current-player-progress/current-player-progress.module';
import {ScoreBoardModule} from "../score-board/score-board.module";


@NgModule({
  declarations: [
    CricketBoardComponent,
    InputButtonRowCricketComponent,
    CricketOverviewTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,


    GameSelectionModule,
    CurrentPlayerProgressModule,
    ScoreBoardModule,


  ]
})
export class CricketBoardModule {
}
