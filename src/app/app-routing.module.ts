import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DartBoardComponent} from './dart-board/dart-board/dart-board.component';
import {GameSelectionComponent} from './welcome-dartboard/initial-view/game-selection.component';

const routes: Routes = [
  {path: '', component: GameSelectionComponent},
  {path: 'dartboard', component: DartBoardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
