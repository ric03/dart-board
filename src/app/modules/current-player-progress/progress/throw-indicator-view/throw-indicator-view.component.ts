import {Component, Input} from '@angular/core';
import {CurrentPlayerService} from "../../../../services/current-player.service";
import {RoundCountService} from "../../../../services/round-count.service";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-throw-indicator-view',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="d-flex flex-row flex-wrap justify-content-evenly pt-2 w-100">
      <button
        [color]="(currentPlayerService._remainingThrows >= 3) ? getProgressColor() : 'gray'"
        mat-mini-fab
        class="no-pointer"
      ><span>➶</span>
      </button>
      <button
        [color]="(currentPlayerService._remainingThrows >= 2) ? getProgressColor() : 'gray'"
        mat-mini-fab
        class="no-pointer"
      ><span>➶</span>
      </button>
      <button
        [color]="(currentPlayerService._remainingThrows >= 1) ? getProgressColor() : 'gray'"
        mat-mini-fab
        class="no-pointer"
      ><span>➶</span>
      </button>
      <p class="fs-6 ps-2 pt-2 text-nowrap">⟳ {{ roundCountService.roundCount }}
        / {{ roundCountService.MAX_ROUND_COUNT }}</p>
    </div>
  `,
})
export class ThrowIndicatorViewComponent {

  @Input() currentPlayerService!: CurrentPlayerService
  @Input() roundCountService!: RoundCountService;

  getProgressColor() {
    const remainingThrows = this.currentPlayerService?._remainingThrows;
    switch (remainingThrows) {
      case 3:
        return 'primary';
      case 2:
        return 'accent';
      case 1:
        return 'warn';
      default:
        return undefined;
    }
  }
}
