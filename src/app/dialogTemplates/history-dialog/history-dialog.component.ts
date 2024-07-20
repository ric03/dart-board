import {Component, Inject} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {HistoryEntry} from "../../models/player/player.model";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {CommonModule} from "@angular/common";

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
