import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PlayerOverviewComponent} from './components/player-overview/player-overview.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIcon} from "@angular/material/icon";


@NgModule({
  declarations: [
    PlayerOverviewComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatIcon,
  ],
  exports: [
    PlayerOverviewComponent,
  ]
})
export class ScoreBoardModule {
}
