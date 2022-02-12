import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DartBoardModule } from './dart-board/dart-board.module';
import { ScoreBoardModule } from './score-board/score-board.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule} from '@angular/material/snack-bar'; 
import { MatToolbarModule} from '@angular/material/toolbar'; 
import { WelcomeDartboardModule } from './welcome-dartboard/welcome-dartboard.module';


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
    WelcomeDartboardModule,
    
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
