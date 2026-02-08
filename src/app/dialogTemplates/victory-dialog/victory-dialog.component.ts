import {Component, inject, Inject, OnInit} from '@angular/core';
import {CurrentPlayerService} from "../../services/current-player.service";
import {RouterModule} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ExplosionAnimationService} from "../../shared/animation/explosion-animation.service";
import {
  MiniPlayerOverview
} from "../../modules/current-player-progress/progress/mini-player-overview/mini-player-overview";
import {GameType} from "../../models/enum/GameType";
import {wellFormedArray} from "../../shared/utils/util";
import {DartService} from "../../services/dart.service";
import {SoundService} from "../../services/sound.service";

export interface VictoryDialogData {
  victoryByReachingRoundLimit: boolean;
}

@Component({
  selector: 'app-victory-dialog',
  template: `
    <h1 mat-dialog-title>Congratulations {{ winner }} !</h1>
    <mat-dialog-content>
      @if (data?.victoryByReachingRoundLimit) {
        <p>You have reached the limit of rounds.</p>
      }
      <div class="d-flex flex-column">
        <app-mini-player-overview></app-mini-player-overview>
      </div>
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
    MiniPlayerOverview,
  ],
  styles: []
})
export class VictoryDialog implements OnInit {
  public currentPlayerService: CurrentPlayerService = inject(CurrentPlayerService);
  @Inject(MAT_DIALOG_DATA) public data?: VictoryDialogData = inject(MAT_DIALOG_DATA);
  private readonly explosionAnimationService = inject(ExplosionAnimationService)
  private readonly dartService = inject(DartService);
  private readonly soundService = inject(SoundService);

  protected winner: string | string[] | number = ''

  ngOnInit(): void {

    if (this.dartService._gameType === GameType.Highscore) {
      this.winner = wellFormedArray(this.currentPlayerService.getPlayersWithHighestPoints());
    } else {
      this.winner = this.currentPlayerService._currentPlayer.value.name
    }
    this.explosionAnimationService.showExplosion('WINNER: ' + this.winner);
    this.soundService.playVictorySound();
  }
}
