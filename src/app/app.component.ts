import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'dart-board';
  private deferredPrompt: any;

  // Warn user about data loss on reload when not in fullscreen
  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(event: BeforeUnloadEvent) {
    // Standard: set returnValue to show confirmation dialog
    if (navigator.userActivation.hasBeenActive) {
      // Recommended
      event.preventDefault();
      // Included for legacy support, e.g. Chrome/Edge < 119
      event.returnValue = true;
    }
    return
  }

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
}
