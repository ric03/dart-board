import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DartBoardModule } from './dart-board/dart-board.module';
import { ScoreBoardModule } from './score-board/score-board.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DartBoardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
