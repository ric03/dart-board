import {Component, Inject} from '@angular/core';
import {HistoryEntry} from "../../models/player/player.model";
import {CommonModule} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

export interface HistoryDialogData {
  playername: string;
  history: HistoryEntry[];
}

@Component({
  selector: 'app-history-dialog',
  template: `
    <h1 mat-dialog-title>history of: {{ data.playername }}</h1>
    <mat-dialog-content *ngFor="let entry of data.history">
      points: {{ entry.sum }} | hits: {{ entry.hits.slice(-3) }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close="">Close</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule
  ],
  styles: []
})
export class HistoryDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: HistoryDialogData,
  ) {
  }
}
