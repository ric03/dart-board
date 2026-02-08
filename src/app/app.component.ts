import {Component, HostListener, inject, OnInit} from '@angular/core';
import {PwaInstallService} from './services/pwa-install.service';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit {

  title = 'dart-board';
  private readonly pwa = inject(PwaInstallService);

  // Warn user about data loss on reload when not in dev-mode
  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(event: BeforeUnloadEvent) {
    if (environment.production) {
      // Show the user the native reload prompt
      // if enabled, this will prevent the automatic reload in dev-mode.
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    // Ask to install if eligible on startup
    this.pwa.askToInstall();
  }
}
