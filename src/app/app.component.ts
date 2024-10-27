import {Component, HostListener, inject, OnDestroy, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {filter, map} from "rxjs";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'dart-board';
  private deferredPrompt: any;

  installBtnHidden: boolean = true
  private wakeLock: WakeLockSentinel | null = null;
  private router: Router = inject(Router);
  appVersion: string = environment.appVersion;


  @HostListener('window:beforeinstallprompt', ['$event'])
  public beforeInstallHandler(event: any) {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = event;
    // Update UI notify the user they can install the PWA
    // this.showInstallPromotion();
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);

  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(event: any) {
    event.preventDefault();
  }

  @HostListener('window:onload', ['$event'])
  public onload(event: any) {
    event.preventDefault();
    this.initDisplayAlwaysOnMode().then(() => {
      this.showScreenLockIndicator();
    });
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
    this.initDisplayAlwaysOnMode().then(() => {
      this.showScreenLockIndicator();
    });
  }

  ngOnInit(): void {
    this.installBtnHidden = false;
    this.initDisplayAlwaysOnMode().then(() => {
      this.showScreenLockIndicator();
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
          this.showScreenLockIndicator();
        });
      })
    );
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

  private async initDisplayAlwaysOnMode() {
    try {
      this.wakeLock = await navigator.wakeLock.request("screen");
    } catch (err) {
      // the wake lock request fails - usually system related, such being low on battery
      // @ts-ignore
      console.log(`${err.name}, ${err.message}`);
    }


  }

  private releaseDisplayAlwaysOnMode() {
    this.wakeLock!.release().then(() => {
      this.wakeLock = null;
    });
  }

  private showScreenLockIndicator() {
    window.document.body.classList.add("display-always-on-indicator")
    setTimeout(() => {
      window.document.body.classList.remove("display-always-on-indicator")
    }, 4000)
  }
}
