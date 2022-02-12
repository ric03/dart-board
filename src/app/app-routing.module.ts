import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DartBoardComponent } from './dart-board/dart-board/dart-board.component';
import { InitialViewComponent } from './welcome-dartboard/initial-view/initial-view.component';

const routes: Routes = [
  { path: '', component: InitialViewComponent },
  { path: 'dartboard', component: DartBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
