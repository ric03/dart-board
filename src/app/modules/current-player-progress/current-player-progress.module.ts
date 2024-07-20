import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrentPlayerProgressComponent} from './progress/current-player-progress.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {MatStepperModule} from "@angular/material/stepper";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";


@NgModule({
  declarations: [
    CurrentPlayerProgressComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatStepperModule,
    MatInputModule,

  ],
  exports: [
    CurrentPlayerProgressComponent,
  ]
})
export class CurrentPlayerProgressModule {

}
