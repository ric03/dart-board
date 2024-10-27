import {Component, OnInit} from '@angular/core';
import {PlayerService} from 'src/app/services/player.service';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-hidden-players-dialog',
  template: `
    <mat-dialog-content>
      <h1 mat-dialog-title>All Players</h1>
      <div *ngFor="let player of this.playerService._players">
        <mat-card class="mb-1">
          <mat-card-subtitle>{{ player.name }}</mat-card-subtitle>
          <mat-card-title>{{ player.remainingPoints }}
          </mat-card-title>
          <br>
          last∑ {{ player.lastScore }}<br>
          @if (player.history.length > 0) {
            <mat-card class="mb-1" *ngFor="let plyerhis of player.history">
              last➶
              {{ plyerhis.hits }} {{ plyerhis.sum }}<br>
            </mat-card>
          }
          <br>
          ⌀ {{ player.average }}<br>
        </mat-card>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="">OK</button>
    </mat-dialog-actions>
  `,
  styles: [],
  imports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class HiddenPlayersDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<HiddenPlayersDialog>, public playerService: PlayerService) {
  }

  ngOnInit() {
    this.dialogRef.updateSize('150%', '75%');
  }

}


