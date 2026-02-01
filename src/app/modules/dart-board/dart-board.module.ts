import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {GameSelectionModule} from '../game-selection/game-selection.module';
import {InputButtonRowComponent} from "./components/input-button-row/input-button-row.component";
import {DartBoardComponent} from './dart-board/dart-board.component';
import {CurrentPlayerProgressModule} from "../current-player-progress/current-player-progress.module";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatBadgeModule} from "@angular/material/badge";
import {ShapeMorphDirective} from "../../shared/directive/shape-morph.directive";
import {MultiplierToggleComponent} from "../../shared/components/multiplier-toggle/multiplier-toggle.component";
import {MissBtn} from "../../shared/components/bottom-line/miss-btn.component";

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
    MatBadgeModule,

    GameSelectionModule,
    CurrentPlayerProgressModule,
    ShapeMorphDirective,
    MultiplierToggleComponent,
    MissBtn,
  ]
})
export class DartBoardModule {
}
