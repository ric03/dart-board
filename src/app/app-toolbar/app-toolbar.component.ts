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
    MatMiniFabButton
  ],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.scss'
})
export class AppToolbarComponent implements OnInit, OnDestroy {

  private deferredPrompt: any;

  installBtnHidden: boolean = true
  private router: Router = inject(Router);
  appVersion: string = environment.appVersion;
  rippelRadius: number = 25
  rippleColor: string = "orange";
  cricketService = inject(CricketService);
  dartService = inject(DartService);
  protected readonly fullscreenService = inject(ToggleFullscreenService);
  protected readonly currentPlayerService = inject(CurrentPlayerService);


  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.installBtnHidden = false;
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
   * TODO: correct impl
   * Triggers the installation process for a Progressive Web App (PWA) using the deferred installation prompt.
   * If the deferred prompt is available, it prompts the user to install the app and handles the user response.
   *
   * @return {void} This method does not return any value.
   */
  localInstall() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.installBtnHidden = true
      this.deferredPrompt.userChoice
        .then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          this.deferredPrompt = null;
        });
    }

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
}
