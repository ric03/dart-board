import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CricketBoardComponent} from './cricket-board/cricket-board.component';
import {InputButtonRowCricketComponent} from './components/input-button-row-cricket/input-button-row-cricket.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRippleModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {GameSelectionModule} from '../game-selection/game-selection.module';
import {CurrentPlayerProgressModule} from '../current-player-progress/current-player-progress.module';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatLabel} from "@angular/material/form-field";
import {ShapeMorphDirective} from "../../shared/directive/shape-morph.directive";
import {MultiplierToggleComponent} from "../../shared/components/multiplier-toggle/multiplier-toggle.component";
import {BottomLine} from "../../shared/components/bottom-line/bottom-line";

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
    MatListModule,
    MatCardModule,
    MatProgressBarModule,


    GameSelectionModule,
    CurrentPlayerProgressModule,
    MatLabel,
    ShapeMorphDirective,
    MultiplierToggleComponent,
    BottomLine,
  ]
})
export class CricketBoardModule {
}
