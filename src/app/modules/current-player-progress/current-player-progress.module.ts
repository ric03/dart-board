import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentPlayerProgressComponent } from './progress/current-player-progress.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    CurrentPlayerProgressComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,

  ],
  exports: [
    CurrentPlayerProgressComponent,
  ]
})
export class CurrentPlayerProgressModule {

}
