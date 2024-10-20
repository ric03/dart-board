import {APP_INITIALIZER, NgModule, isDevMode} from '@angular/core';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
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
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MatIcon} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
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
    HiddenPlayersDialog,

    MatButtonModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatIcon,
  ],
  providers: [
    RedirectWarningService,
    {
      provide: APP_INITIALIZER,
      useFactory: noop,
      deps: [RedirectWarningService],
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
