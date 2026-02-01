import {Component, inject, Inject} from '@angular/core';
import {CurrentPlayerService} from "../../services/current-player.service";
import {RouterModule} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {ExplosionAnimationService} from "../../shared/animation/explosion-animation.service";

export interface VictoryDialogData {
  victoryByReachingRoundLimit: boolean;
}

@Component({
  selector: 'app-victory-dialog',
  template: `
    <h1 mat-dialog-title>Congratulations, {{ currentPlayerService._currentPlayer.value.name }}. You have
      won. {{ currentPlayerService._currentPlayer.value.remainingPoints > 0 ? currentPlayerService._currentPlayer.value.remainingPoints + ' Points' : '' }}</h1>
    <mat-dialog-content>
      <p *ngIf="data?.victoryByReachingRoundLimit">You have reached the limit of rounds.</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button color="warn" mat-dialog-close="" routerLink="/">main menu</button>
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

  constructor(public currentPlayerService: CurrentPlayerService,
              @Inject(MAT_DIALOG_DATA) public data: VictoryDialogData,
  ) {
    inject(ExplosionAnimationService).showExplosion('WINNER: ' + currentPlayerService._currentPlayer.value.name);
  }
}
