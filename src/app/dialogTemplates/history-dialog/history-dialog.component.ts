import {Component, Inject} from '@angular/core';
import {Player} from "../../models/player/player.model";
import {CommonModule} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

export interface HistoryDialogData {
  player: Player;
}

@Component({
  selector: 'app-history-dialog',
  template: `
    <h1 mat-dialog-title>history of: {{ data.player.name }}</h1>
    <mat-dialog-content>
      <mat-card class="mb-1">
        <mat-card-title>{{ data.player.remainingPoints }}
        </mat-card-title>
        <br>
        last∑ {{ data.player.lastScore }}<br>
        last➶ {{ data.player.last3History }}<br>
        ⌀ {{ data.player.average }}<br>
        <mat-card *ngFor="let plyerhis of data.player.history">
          {{ plyerhis.sum }} | {{ plyerhis.hits }}
        </mat-card>
      </mat-card>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close="">Close</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
  ],
  styles: []
})
export class HistoryDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: HistoryDialogData,
  ) {
  }
}
