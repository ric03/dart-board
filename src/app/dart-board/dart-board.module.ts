import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppRoutingModule} from '../app-routing.module';
import {GameSelectionModule} from '../game-selection/game-selection.module';
import {InputModule} from '../input/input.module';
import {ScoreBoardModule} from '../score-board/score-board.module';
import {DartBoardComponent} from './dart-board/dart-board.component';


@NgModule({
  declarations: [
    DartBoardComponent,
  ],
  imports: [
    CommonModule,
    InputModule,
    ScoreBoardModule,
    MatToolbarModule,
    GameSelectionModule,
    MatMenuModule,
    AppRoutingModule,
  ]
})
export class DartBoardModule {
}
