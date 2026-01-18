import {Component, HostListener, inject, OnInit} from '@angular/core';
import {PwaInstallService} from './services/pwa-install.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit {

  title = 'dart-board';
  private readonly pwa = inject(PwaInstallService);

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

  ngOnInit(): void {
    // Ask to install if eligible on startup
    this.pwa.askToInstall();
  }
}
