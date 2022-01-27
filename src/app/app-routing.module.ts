import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DartBoardComponent } from './dart-board/dart-board/dart-board.component';
import { OutputComponent } from './score-board/output/output.component';

const routes: Routes = [
  { path: '', component: DartBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
