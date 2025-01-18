import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'dart-board';
  private deferredPrompt: any;
  private wakeLock: WakeLockSentinel | null = null;

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

  @HostListener('window:onload', ['$event'])
  public onload(event: any) {
    event.preventDefault();
    this.initDisplayAlwaysOnMode().then(() => {
      console.info('wake lock requested');
    });
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
    this.initDisplayAlwaysOnMode().then(() => {
      console.info('wake lock requested');
    });
  }

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.initDisplayAlwaysOnMode().then(() => {
      console.info('wake lock requested');
    })
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


}
