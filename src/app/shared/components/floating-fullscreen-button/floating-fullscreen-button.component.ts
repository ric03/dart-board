import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {ToggleFullscreenService} from '../../../services/toggle-fullscreen.service';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-floating-fullscreen-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon],
  template: `
    <div class="floating-fullscreen-btn-position column">
      <button mat-icon-button color="accent"
              class="floating-fullscreen-btn-bg"
              (click)="toggle()"
              aria-label="Toggle fullscreen">
        <mat-icon>{{ isFullscreen() ? 'fullscreen_exit' : 'fullscreen' }}</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .floating-fullscreen-btn-bg {
      background-color: green;
    }

    .floating-fullscreen-btn-position {
      position: fixed;
      left: 16px;
      bottom: 16px;
      z-index: 1000; /* above most content but below dialogs */
    }
  `]
})
export class FloatingFullscreenButtonComponent implements OnInit {
  private fullscreen: ToggleFullscreenService = inject(ToggleFullscreenService)
  private readonly destroyRef = inject(DestroyRef);
  protected isFullscreen = signal<boolean>(!!document.fullscreenElement);
  private fsChangeHandler = () => this.isFullscreen.set(!!document.fullscreenElement);

  ngOnInit(): void {
    document.addEventListener('fullscreenchange', this.fsChangeHandler);
    this.destroyRef.onDestroy(() => {
      document.removeEventListener('fullscreenchange', this.fsChangeHandler);
    });
  }

  toggle() {
    this.fullscreen.toggleTabFullScreenModeMenue();
  }
}
