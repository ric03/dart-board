import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuitConfirmationDialog } from './dialogTemplates/quit-confirmation-dialog/quit-confirmation-dialog.component';
import { VictoryDialog } from './dialogTemplates/victory-dialog/victory-dialog.component';
import { DartBoardModule } from './modules/dart-board/dart-board.module';
import { GameSelectionModule } from './modules/game-selection/game-selection.module';
import { PageNotFoundModule } from "./modules/page-not-found/page-not-found.module";
import { ScoreBoardModule } from './modules/score-board/score-board.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HiddenPlayersDialog } from './dialogTemplates/hidden-players-dialog/hidden-players-dialog.component';
import { CricketBoardModule } from './modules/cricket-board/cricket-board.module';
import { MatCardModule } from '@angular/material/card';
import { CurrentPlayerProgressModule } from './modules/current-player-progress/current-player-progress.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    VictoryDialog,
    QuitConfirmationDialog,
    HiddenPlayersDialog,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    DartBoardModule,
    CricketBoardModule,
    ScoreBoardModule,
    GameSelectionModule,
    PageNotFoundModule,
    CurrentPlayerProgressModule,

    MatButtonModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,



    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
