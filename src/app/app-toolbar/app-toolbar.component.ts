import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink} from "@angular/router";
import {filter, map} from "rxjs";
import {MatToolbar} from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {NgStyle} from "@angular/common";
import {MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatRipple} from "@angular/material/core";
import {CricketWinInstructionsDialog} from "../dialogTemplates/info-dialog/cricket-info-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CricketService} from "../services/cricket.service";
import {DartService} from "../services/dart.service";

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
    MatFabButton,
    MatRipple,
    MatMiniFabButton
  ],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.scss'
})
export class AppToolbarComponent implements OnInit, OnDestroy {

  private deferredPrompt: any;

  installBtnHidden: boolean = true
  private wakeLock: WakeLockSentinel | null = null;
  private router: Router = inject(Router);
  appVersion: string = environment.appVersion;
  rippelRadius: number = 25
  rippleColor: string = "orange";
  cricketService = inject(CricketService);
  dartService = inject(DartService);


  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.installBtnHidden = false;
    this.initDisplayAlwaysOnMode().then(() => {
      console.info('wake lock requested');
    });
    this.checkWakelockOnNavigation();
  }

  ngOnDestroy(): void {
    this.releaseDisplayAlwaysOnMode();
  }

  private checkWakelockOnNavigation() {
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd || e instanceof NavigationStart || e instanceof NavigationCancel || e instanceof NavigationError),
      map(async () => {
        console.error('navigate');
        this.initDisplayAlwaysOnMode().then(() => {
          console.info('wake lock requested');
        })
      })
    );
  }

  private releaseDisplayAlwaysOnMode() {
    this.wakeLock!.release().then(() => {
      this.wakeLock = null;
    });
  }


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

  toggleTabFullScreenMode() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        this.initDisplayAlwaysOnMode().then(() => {
          console.log('full screen and display always on mode requested');
        })
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }


  private async initDisplayAlwaysOnMode() {
    try {
      this.wakeLock = await navigator.wakeLock.request("screen");
    } catch (err) {
      // the wake lock request fails - usually system related, such being low on battery
      // @ts-ignore
      console.log(`${err.name}, ${err.message}`);
    }
  }

  openGameInstructions() {
    if (this.cricketService._gameType !== '') {
      this.dialog.open(CricketWinInstructionsDialog);
    } else {
      window.alert("not implemented yet");
    }
  }

}
