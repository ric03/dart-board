import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputButtonRowComponent } from './input-button-row/input-button-row.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatButtonModule} from '@angular/material/button'; 
import {MatRippleModule} from '@angular/material/core'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 


@NgModule({
  declarations: [
    InputButtonRowComponent,
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
  ],
  exports: [
    InputButtonRowComponent,
  ]
})
export class InputModule { }
