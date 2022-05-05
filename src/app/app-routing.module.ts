import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CricketBoardComponent} from './modules/cricket-board/cricket-board/cricket-board.component';
import {DartBoardComponent} from './modules/dart-board/dart-board/dart-board.component';
import {GameSelectionComponent} from './modules/game-selection/game-selection/game-selection.component';
import {PageNotFoundComponent} from "./modules/page-not-found/page-not-found.component";
import {GameInitializationResolver} from "./services/game-initialization-resolver.service";
import {QueryParamValidationGuard} from "./services/query-param-validation-guard.service";

const routes: Routes = [
  {path: '', component: GameSelectionComponent},
  {
    path: 'cricketboard',
    component: CricketBoardComponent,
    canActivate: [QueryParamValidationGuard],
    resolve: {gameInitialization: GameInitializationResolver}
  },
  {
    path: 'dartboard',
    component: DartBoardComponent,
    canActivate: [QueryParamValidationGuard],
    resolve: {gameInitialization: GameInitializationResolver}
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
