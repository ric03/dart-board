import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DartBoardComponent } from './dart-board/dart-board.component';
import { InputModule } from '../input/input.module';
import { ScoreBoardModule } from '../score-board/score-board.module';
import { MatToolbarModule} from '@angular/material/toolbar';
import { WelcomeDartboardModule } from '../welcome-dartboard/welcome-dartboard.module';


@NgModule({
  declarations: [
    DartBoardComponent,
  ],
  imports: [
    CommonModule,
    InputModule,
    ScoreBoardModule,
    MatToolbarModule,
    WelcomeDartboardModule,
  ]
})
export class DartBoardModule { }
