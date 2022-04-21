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
import { ScoreBoardModule } from '../score-board/score-board.module';



@NgModule({
  declarations: [
    CricketBoardComponent,
    InputButtonRowCricketComponent,
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

    GameSelectionModule,
    ScoreBoardModule,
  ]
})
export class CricketBoardModule { }
