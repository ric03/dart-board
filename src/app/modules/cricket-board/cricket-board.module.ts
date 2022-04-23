import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CricketBoardComponent } from './cricket-board/cricket-board.component';
import { InputButtonRowCricketComponent } from './components/input-button-row-cricket/input-button-row-cricket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GameSelectionModule } from '../game-selection/game-selection.module';
import { CricketOverviewTableComponent } from './components/cricket-overview-table/cricket-overview-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CurrentPlayerProgressModule } from '../current-player-progress/current-player-progress.module';


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


  ]
})
export class CricketBoardModule { }
