import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRippleModule} from "@angular/material/core";
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from "@angular/material/tooltip";
import {GameSelectionModule} from '../game-selection/game-selection.module';
import {ScoreBoardModule} from '../score-board/score-board.module';
import {DartBoardComponent} from './dart-board/dart-board.component';
import {InputButtonRowComponent} from "./input-button-row/input-button-row.component";


@NgModule({
  declarations: [
    DartBoardComponent,
    InputButtonRowComponent,
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,

    GameSelectionModule,
    ScoreBoardModule,
  ]
})
export class DartBoardModule {
}
