import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {GameSelectionComponent} from './initial-view/game-selection.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    GameSelectionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
  ],
  exports: [
    GameSelectionComponent,
  ]
})
export class WelcomeDartboardModule {
}
