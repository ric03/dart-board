import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DartBoardComponent } from './dart-board/dart-board.component';
import { InputModule } from '../input/input.module';
import { ScoreBoardModule } from '../score-board/score-board.module';
import { MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [
    DartBoardComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    ScoreBoardModule,
    MatToolbarModule
  ]
})
export class DartBoardModule { }
