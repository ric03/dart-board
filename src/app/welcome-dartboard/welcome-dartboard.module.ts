import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { InitialViewComponent } from './initial-view/initial-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    InitialViewComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    InitialViewComponent,
  ]
})
export class WelcomeDartboardModule { }
