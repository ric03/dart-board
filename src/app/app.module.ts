import {NgModule} from '@angular/core';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuitConfirmationDialog} from './modals/quit-confirmation-dialog/quit-confirmation-dialog.component';
import {VictoryDialog} from './modals/victory-dialog/victory-dialog.component';
import {DartBoardModule} from './modules/dart-board/dart-board.module';
import {GameSelectionModule} from './modules/game-selection/game-selection.module';
import {PageNotFoundModule} from "./modules/page-not-found/page-not-found.module";
import {ScoreBoardModule} from './modules/score-board/score-board.module';

@NgModule({
  declarations: [
    AppComponent,
    VictoryDialog,
    QuitConfirmationDialog,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    DartBoardModule,
    ScoreBoardModule,
    GameSelectionModule,
    PageNotFoundModule,

    MatSnackBarModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
