import {Component, inject} from '@angular/core';
import {Player} from "../../models/player/player.model";
import {CommonModule} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {wellFormedArray} from "../../shared/utils/util";

export interface HistoryDialogData {
  player: Player;
}

@Component({
  selector: 'app-history-dialog',
  template: `
    <div class="minWith15vw">
      <h1 mat-dialog-title>history of: {{ historyData.player.name }}</h1>
      <mat-dialog-content class="">
        <mat-card class="mb-1">
          <mat-card-title>{{ historyData.player.remainingPoints }}
          </mat-card-title>
          <br>
          last∑ {{ sumLast3(historyData.player.last3History) }}<br>
          last➶ {{ wellFormedArray(historyData.player.last3History) }}<br>
          ⌀ {{ historyData.player.average }}<br>
          Match-History:
          @for (playerhistory of historyData.player.history; track $index) {
            <mat-card class="flex-row">
              <div class="w-25">∑ {{ playerhistory.sum }}</div>
              <div class="w-75">|➶ {{ wellFormedArray(playerhistory.hits) }}</div>
            </mat-card>
          }
        </mat-card>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-raised-button mat-dialog-close="">Close</button>
      </mat-dialog-actions>
    </div>
  `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
  ],
  styles: [' .minWith15vw { min-width: 15vw; }']
})
export class HistoryDialog {

  public historyData: HistoryDialogData = inject(MAT_DIALOG_DATA)

  sumLast3(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0);
  }


  protected readonly wellFormedArray = wellFormedArray;
}
