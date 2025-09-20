import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {ToggleFullscreenService} from '../../../services/toggle-fullscreen.service';

@Component({
  selector: 'app-floating-fullscreen-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <button mat-icon-button color="accent"
            class="floating-fullscreen-btn"
            (click)="toggle()"
            aria-label="Toggle fullscreen">
      <span class="material-symbols-outlined">{{ isFullscreen() ? 'fullscreen_exit' : 'fullscreen' }}</span>
    </button>
  `,
  styles: [`
    .floating-fullscreen-btn {
      background-color: green;
      position: fixed;
      left: 16px;
      bottom: 16px;
      z-index: 1000; /* above most content but below dialogs */
    }
  `]
})
export class FloatingFullscreenButtonComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  protected isFullscreen = signal<boolean>(!!document.fullscreenElement);
  private fsChangeHandler = () => this.isFullscreen.set(!!document.fullscreenElement);

  constructor(private fullscreen: ToggleFullscreenService) {
  }

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
