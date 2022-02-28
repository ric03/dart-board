import {NgModule} from '@angular/core';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DartBoardModule} from './dart-board/dart-board.module';
import {GameSelectionModule} from './game-selection/game-selection.module';
import {OvershotModalComponent} from './modals/overshot-modal/overshot-modal.component';
import {QuitConfirmationModalComponent} from './modals/quit-confirmation-modal/quit-confirmation-modal.component';
import {VictoryModalComponent} from './modals/victory-modal/victory-modal.component';
import {PageNotFoundModule} from "./page-not-found/page-not-found.module";
import {ScoreBoardModule} from './score-board/score-board.module';


@NgModule({
  declarations: [
    AppComponent,
    OvershotModalComponent,
    VictoryModalComponent,
    QuitConfirmationModalComponent,

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
