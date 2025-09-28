import {Component, inject, Inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {
  ThrowIndicatorViewComponent
} from "../../modules/current-player-progress/progress/throw-indicator-view/throw-indicator-view.component";
import {CurrentPlayerService} from "../../services/current-player.service";
import {RoundCountService} from "../../services/round-count.service";

interface HoldSnackData {
  duration: number; // ms
}

@Component({
  selector: 'app-shape-morph-hold-snack',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, ThrowIndicatorViewComponent],
  template: `
    <div class="d-flex align-items-center w-100" style="min-width: 240px">
      <div class="me-3">Gedrückt
        halten… {{ (this.elapsed / this.duration).toFixed(1) <= (this.duration / 1000).toFixed(1) ? (this.elapsed / this.duration).toFixed(1) : (this.duration / 1000).toFixed(1) }}
        s
      </div>
      <mat-progress-bar [value]="progress" mode="determinate" color="accent"></mat-progress-bar>
    </div>
    <app-throw-indicator-view [currentPlayerService]="currentPlayerService"
                              [roundCountService]="roundCountService"></app-throw-indicator-view>
  `
})
export class ShapeMorphHoldSnackComponent implements OnInit, OnDestroy {
  progress = 0;
  protected timerId: any = null;
  private startTime = 0;
  readonly duration: number;
  elapsed: number = 0
  currentPlayerService = inject(CurrentPlayerService)
  roundCountService = inject(RoundCountService)

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) data: HoldSnackData,
    private snackRef: MatSnackBarRef<ShapeMorphHoldSnackComponent>
  ) {
    this.duration = Math.max(1, data?.duration ?? 1000);
  }

  ngOnInit(): void {
    // Use a timer instead of requestAnimationFrame
    this.startTime = Date.now();
    const tickMs = 25; // ~60fps; adjust if you want fewer updates
    this.timerId = setInterval(() => {
      this.elapsed = Date.now() - this.startTime;
      this.progress = Math.min(100, (this.elapsed / this.duration) * 100);
      if (this.elapsed === this.duration) {
        clearInterval(this.timerId);
        this.timerId = null;
        // When reaching 100, close the snack so directive can react via afterDismissed
        this.snackRef.dismiss();
      }
    }, tickMs);
  }

  ngOnDestroy(): void {
    if (this.timerId != null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
