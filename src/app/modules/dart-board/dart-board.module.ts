import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {GameSelectionModule} from '../game-selection/game-selection.module';
import {ScoreBoardModule} from '../score-board/score-board.module';
import {InputButtonRowComponent} from "./components/input-button-row/input-button-row.component";
import {DartBoardComponent} from './dart-board/dart-board.component';
import {CurrentPlayerProgressModule} from "../current-player-progress/current-player-progress.module";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    DartBoardComponent,
    InputButtonRowComponent,
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

    GameSelectionModule,
    ScoreBoardModule,
    CurrentPlayerProgressModule,
  ]
})
export class DartBoardModule {
}
