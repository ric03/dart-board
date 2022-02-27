import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DartBoardModule} from './dart-board/dart-board.module';
import {ScoreBoardModule} from './score-board/score-board.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {WelcomeDartboardModule} from './welcome-dartboard/welcome-dartboard.module';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {OvershotComponent} from './overshot/overshot.component';
import {WonComponent} from './won/won.component';
import {QuitQuestionComponent} from './quit-question/quit-question.component';
import {MatDialogModule} from '@angular/material/dialog';
import {PageNotFoundModule} from "./page-not-found/page-not-found.module";


@NgModule({
  declarations: [
    AppComponent,
    OvershotComponent,
    WonComponent,
    QuitQuestionComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    DartBoardModule,
    ScoreBoardModule,
    WelcomeDartboardModule,
    PageNotFoundModule,

    MatSnackBarModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
