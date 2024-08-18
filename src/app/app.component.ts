import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'dart-board';
  private deferredPrompt: any;

  installBtnHidden: boolean = true


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

}
