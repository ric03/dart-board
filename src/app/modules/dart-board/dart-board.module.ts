import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRippleModule} from "@angular/material/core";
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLegacyTooltipModule as MatTooltipModule} from "@angular/material/legacy-tooltip";
import {GameSelectionModule} from '../game-selection/game-selection.module';
import {ScoreBoardModule} from '../score-board/score-board.module';
import {InputButtonRowComponent} from "./components/input-button-row/input-button-row.component";
import {DartBoardComponent} from './dart-board/dart-board.component';
import {CurrentPlayerProgressModule} from "../current-player-progress/current-player-progress.module";


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
