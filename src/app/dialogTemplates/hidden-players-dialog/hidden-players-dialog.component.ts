import {Component} from '@angular/core';
import {PlayerService} from 'src/app/services/player.service';

@Component({
  selector: 'app-hidden-players-dialog',
  template: `
    <h1 mat-dialog-title>All Players</h1>
    <mat-dialog-content>
      <mat-card class="mb-1" *ngFor="let player of playerService._players">
        <mat-card-title>{{player.name}}: {{player.remainingPoints}}</mat-card-title>
      </mat-card>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close="">OK</button>
    </mat-dialog-actions>
  `,
  styles: []
})
export class HiddenPlayersDialog {

  constructor(public playerService: PlayerService
  ) {
  }
}


