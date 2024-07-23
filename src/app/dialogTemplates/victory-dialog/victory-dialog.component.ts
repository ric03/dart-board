import {Component, Inject} from '@angular/core';
import {CurrentPlayerService} from "../../services/current-player.service";
import {ROUND_LIMIT} from "../../services/round-count.service";
import {RouterModule} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";

export interface VictoryDialogData {
  victoryByReachingRoundLimit: boolean;
}

@Component({
  selector: 'app-victory-dialog',
  template: `
    <h1 mat-dialog-title>Congratulations, {{ currentPlayerService._currentPlayer.value.name }}. You have won.</h1>
    <mat-dialog-content>
      <p *ngIf="data?.victoryByReachingRoundLimit">You have reached the limit of {{ roundLimit }} rounds.</p>
      <p>Do you want to play again?</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close="" routerLink="/">Yes, let's play darts!</button>
      <button mat-button mat-dialog-close="">No, stay here and look around.</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    NgIf,
  ],
  styles: []
})
export class VictoryDialog {

  roundLimit = ROUND_LIMIT

  constructor(public currentPlayerService: CurrentPlayerService,
              @Inject(MAT_DIALOG_DATA) public data: VictoryDialogData,
  ) {
  }
}
