import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DartBoardComponent} from './modules/dart-board/dart-board/dart-board.component';
import {GameInitializationResolver} from "./modules/dart-board/resolver/game-initialization-resolver.service";
import {GameSelectionComponent} from './modules/game-selection/game-selection/game-selection.component';
import {PageNotFoundComponent} from "./modules/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', component: GameSelectionComponent},
  {path: 'dartboard', component: DartBoardComponent, resolve: {gameInitialization: GameInitializationResolver}},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
