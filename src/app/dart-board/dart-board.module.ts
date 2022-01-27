import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DartBoardComponent } from './dart-board/dart-board.component';
import { InputModule } from '../input/input.module';
import { ScoreBoardModule } from '../score-board/score-board.module';



@NgModule({
  declarations: [
    DartBoardComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    ScoreBoardModule,
  ]
})
export class DartBoardModule { }
