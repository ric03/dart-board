import {Component, HostListener, inject, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";

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

  ngOnInit(): void {
    this.installBtnHidden = false;
    this.initDisplayAlwaysOnMode().then(promise => console.log(promise));
    this.checkWakelockOnNavigatiomn();
  }


  private checkWakelockOnNavigatiomn() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(async () => {
        if (this.wakeLock !== null) {
          this.wakeLock = await navigator.wakeLock.request("screen");
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.releaseDisplayAlwaysOnMode();
  }


  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(event: any) {
    event.preventDefault();
  }

  @HostListener('window:onload', ['$event'])
  public onload(event: any) {
    event.preventDefault();
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
}
