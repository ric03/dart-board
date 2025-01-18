import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrentPlayerProgressComponent} from './progress/current-player-progress.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {ScoreBoardModule} from "../score-board/score-board.module";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";


@NgModule({
  declarations: [
    CurrentPlayerProgressComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatStepperModule,
    MatInputModule,
    ScoreBoardModule,
    MatFabButton,
    MatMiniFabButton,

  ],
  exports: [
    CurrentPlayerProgressComponent,
  ]
})
export class CurrentPlayerProgressModule {

}
