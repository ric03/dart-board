import {Component, inject, OnInit} from '@angular/core';
import {PlayerService} from 'src/app/services/player.service';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {GameType} from "../../models/enum/GameType";
import {CurrentPlayerService} from "../../services/current-player.service";
import {
  MiniPlayerOverview
} from "../../modules/current-player-progress/progress/mini-player-overview/mini-player-overview";

@Component({
  selector: 'app-hidden-players-dialog',
  templateUrl: './hidden-players-dialog.component.html',
  imports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MiniPlayerOverview
  ],
  standalone: true
})
export class HiddenPlayersDialog implements OnInit {
  protected readonly GameType = GameType;
  public currentPlayerService = inject(CurrentPlayerService);

  constructor(public dialogRef: MatDialogRef<HiddenPlayersDialog>, public playerService: PlayerService) {
  }

  ngOnInit() {
    this.dialogRef.updateSize('200%', '75%');
  }

  getDiff(player: any): number {
    return Math.abs(this.currentPlayerService._currentPlayer.value.remainingPoints - player.remainingPoints);
  }
}


