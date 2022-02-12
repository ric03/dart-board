import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DartBoardModule } from './dart-board/dart-board.module';
import { ScoreBoardModule } from './score-board/score-board.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule} from '@angular/material/snack-bar'; 
import { MatToolbarModule} from '@angular/material/toolbar'; 
import { MatBadgeModule} from '@angular/material/badge'; 


@NgModule({
  declarations: [
    AppComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DartBoardModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ScoreBoardModule,
    MatToolbarModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
