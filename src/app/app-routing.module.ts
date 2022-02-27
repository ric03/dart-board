import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DartBoardComponent} from './dart-board/dart-board/dart-board.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {GameSelectionComponent} from './welcome-dartboard/initial-view/game-selection.component';

const routes: Routes = [
  {path: '', component: GameSelectionComponent},
  {path: 'dartboard', component: DartBoardComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
