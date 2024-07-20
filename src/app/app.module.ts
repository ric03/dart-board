import {APP_INITIALIZER, NgModule} from '@angular/core';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HiddenPlayersDialog} from './dialogTemplates/hidden-players-dialog/hidden-players-dialog.component';
import {CricketBoardModule} from './modules/cricket-board/cricket-board.module';
import {CurrentPlayerProgressModule} from './modules/current-player-progress/current-player-progress.module';
import {DartBoardModule} from './modules/dart-board/dart-board.module';
import {GameSelectionModule} from './modules/game-selection/game-selection.module';
import {PageNotFoundModule} from "./modules/page-not-found/page-not-found.module";
import {ScoreBoardModule} from './modules/score-board/score-board.module';
import {RedirectWarningService} from "./services/redirect-warning.service";
import {noop} from "./shared/util";
import {SwitchPlayerSnackComponent} from './dialogTemplates/switch-player-snack/switch-player-snack.component';

@NgModule({
  declarations: [
    AppComponent,
    HiddenPlayersDialog,
    SwitchPlayerSnackComponent,
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
  ],
  providers: [
    RedirectWarningService,
    {
      provide: APP_INITIALIZER,
      useFactory: noop,
      deps: [RedirectWarningService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
