import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink} from "@angular/router";
import {filter, map} from "rxjs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule, NgStyle} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {CricketWinInstructionsDialog} from "../dialogTemplates/info-dialog/cricket-info-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CricketService} from "../services/cricket.service";
import {DartService} from "../services/dart.service";
import {DartInfoDialogComponent} from "../dialogTemplates/info-dialog/dart-info-dialog.component";
import {CurrentPlayerService} from "../services/current-player.service";
import {ToggleFullscreenService} from "../services/toggle-fullscreen.service";
import {customRipple} from "../shared/utils/util";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {GameType} from "../models/enum/GameType";
import {DrunkToggleService} from "../services/drunk-toggle.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {PwaInstallService} from "../services/pwa-install.service";
import {SoundService} from "../services/sound.service";

@Component({
  selector: 'app-app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    NgStyle,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatRippleModule,
    MatSlideToggleModule,
    MatTooltipModule,
    CommonModule
  ],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.scss'
})
export class AppToolbarComponent implements OnInit, OnDestroy {

  installBtnHidden: boolean = true
  private router: Router = inject(Router);
  pwa = inject(PwaInstallService);
  appVersion: string = environment.appVersion
  drunkModeService = inject(DrunkToggleService);
  soundService = inject(SoundService);
  cricketService = inject(CricketService);
  dartService = inject(DartService);
  protected readonly fullscreenService = inject(ToggleFullscreenService);
  protected readonly currentPlayerService = inject(CurrentPlayerService);
  protected readonly customRipple = customRipple;
  private dialog = inject(MatDialog)


  ngOnInit(): void {
    // Hide install button by default; show it only when the deferred prompt is available
    this.installBtnHidden = true;

    // Drive visibility from PwaInstallService
    this.pwa.canInstall$.subscribe((can) => {
      this.installBtnHidden = !can;
    });

    this.fullscreenService.initDisplayAlwaysOnMode().then(() => {
      console.info('wake lock requested');
    });
    this.checkWakelockOnNavigation();
  }

  ngOnDestroy(): void {
    this.fullscreenService.releaseDisplayAlwaysOnMode();
  }

  private checkWakelockOnNavigation() {
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd || e instanceof NavigationStart || e instanceof NavigationCancel || e instanceof NavigationError),
      map(async () => {
        console.error('navigate');
        this.fullscreenService.initDisplayAlwaysOnMode().then(() => {
          console.info('wake lock requested');
        })
      })
    );
  }

  openGameInstructions() {
    if (this.cricketService._gameType !== '') {
      this.dialog.open(CricketWinInstructionsDialog);
    } else {
      this.dialog.open(DartInfoDialogComponent);
    }
  }

  undoLastAction() {
    this.currentPlayerService.undoLastPlayerActions();
  }

  get canChangeFirstPlayer(): boolean {
    // Allow reordering only if no points have been scored yet in the current mode
    const isCricket = this.cricketService._gameType !== '';
    if (isCricket) {
      return this.currentPlayerService._lastCricketHistory.size === 0 && this.currentPlayerService._last3History.length === 0;
    } else {
      return this.currentPlayerService._last3History.length === 0;
    }
  }

  setNextPlayerAsFirst() {
    if (!this.canChangeFirstPlayer) {
      console.warn('Spielerreihenfolge kann nicht mehr geändert werden: Es wurden bereits Punkte erzielt.');
      return;
    }

    const isCricket = this.cricketService._gameType !== '';

    if (isCricket) {
      // Rotate for Cricket
      if (this.cricketService.playerNames.length > 1) {
        const firstPlayer = this.cricketService.playerNames.shift();
        if (firstPlayer) {
          this.cricketService.playerNames.push(firstPlayer);
        }
      }
      this.cricketService.initPlayers(this.cricketService.playerNames);
    } else {
      // Rotate for Dart
      if (this.dartService.playerNames.length > 1) {
        const firstPlayer = this.dartService.playerNames.shift();
        if (firstPlayer) {
          this.dartService.playerNames.push(firstPlayer);
        }
      }
      this.dartService.initPlayers(this.dartService.playerNames);
    }
  }


  getCurrentGameModeName(): string {
    const isCricket = this.cricketService._gameType !== '';
    if (isCricket) {
      return 'Cricket';
    }
    const dartMode = this.dartService._gameType;
    if (dartMode === GameType.Simple501) return '501';
    if (dartMode === GameType.DoubleOut501) return '501 (DO)';
    if (dartMode === GameType.Elimination301) return 'Elimination';
    if (dartMode === GameType.Highscore) return 'Highscore';
    return '';
  }

  setDrunkMode(checked: boolean) {
    this.drunkModeService.isDrunkModeOn.next(checked)
  }

  setSoundMode(checked: boolean) {
    this.soundService.isSoundEnabled.set(checked);
  }

  toggleSound() {
    const isEnabled = this.soundService.isSoundEnabled()
    this.soundService.isSoundEnabled.set(!isEnabled);
  }
}
