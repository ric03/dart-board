import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {GameSelectionComponent} from './game-selection/game-selection.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";

@NgModule({
  declarations: [
    GameSelectionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    MatIcon,
  ],
  exports: [
    GameSelectionComponent,
  ]
})
export class GameSelectionModule {
}
