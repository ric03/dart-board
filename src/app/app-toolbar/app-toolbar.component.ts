import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink} from "@angular/router";
import {filter, map} from "rxjs";
import {MatToolbar} from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {NgStyle} from "@angular/common";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatRipple} from "@angular/material/core";
import {CricketWinInstructionsDialog} from "../dialogTemplates/info-dialog/cricket-info-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CricketService} from "../services/cricket.service";
import {DartService} from "../services/dart.service";
import {DartInfoDialogComponent} from "../dialogTemplates/info-dialog/dart-info-dialog.component";
import {CurrentPlayerService} from "../services/current-player.service";
import {ToggleFullscreenService} from "../services/toggle-fullscreen.service";
import {customRipple} from "../shared/util";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {DrunkToggleService} from "../services/drunk-toggle.service";
import {MatTooltip} from "@angular/material/tooltip";
import {SoundToggleService} from "../services/sound-toggle.service";
import {PwaInstallService} from "../services/pwa-install.service";

@Component({
  selector: 'app-app-toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatMenu,
    MatIcon,
    NgStyle,
    MatIconButton,
    MatMenuItem,
    RouterLink,
    MatMenuTrigger,
    MatRipple,
    MatMiniFabButton,
    MatSlideToggle,
    MatTooltip
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
  soundToggleService = inject(SoundToggleService);
  cricketService = inject(CricketService);
  dartService = inject(DartService);
  protected readonly fullscreenService = inject(ToggleFullscreenService);
  protected readonly currentPlayerService = inject(CurrentPlayerService);
  protected readonly customRipple = customRipple;


  constructor(private dialog: MatDialog) {
  }

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


  /**
   * Löst den lokalen PWA-Installationsdialog aus, sofern verfügbar.
   * Der Dialog steht nur bereit, nachdem das "beforeinstallprompt"-Event abgefangen wurde.
   */
  async localInstall() {
    await this.pwa.triggerInstall();
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


  setDrunkMode(checked: boolean) {
    this.drunkModeService.isDrunkModeOn.next(checked)
  }

  setSoundMode(checked: boolean) {
    this.soundToggleService.isSoundOn.next(checked);
  }
}
