import {Component, inject} from '@angular/core';
import {CurrentPlayerService} from "../../../services/current-player.service";
import {RoundCountService} from "../../../services/round-count.service";
import {PlayerService} from "../../../services/player.service";
import {GameType} from "../../../models/enum/GameType";
import {MatDialog} from "@angular/material/dialog";
import {HiddenPlayersDialog} from "../../../dialogTemplates/hidden-players-dialog/hidden-players-dialog.component";

@Component({
  selector: 'app-current-player-progress',
  templateUrl: './current-player-progress.component.html',
  styleUrls: ['./current-player-progress.component.scss'],
  standalone: false,
})
export class CurrentPlayerProgressComponent {
  public playerService = inject(PlayerService);
  protected readonly GameType = GameType;
  public currentPlayerService: CurrentPlayerService = inject(CurrentPlayerService);
  public roundCountService: RoundCountService = inject(RoundCountService);
  private dialog: MatDialog = inject(MatDialog);

  getProgressColor() {
    const remainingThrows = this.currentPlayerService._remainingThrows;
    switch (remainingThrows) {
      case 3:
        return 'primary';
      case 2:
        return 'accent';
      case 1:
        return 'warn';
      default:
        return undefined;
    }
  }

  getDiffToCurrentPlayer(player: any): number {
    const currentPoints = this.currentPlayerService._remainingPointsToDisplay();
    return Math.abs(currentPoints - player.remainingPoints);
  }

  getCricketValues(): number[] {
    return [15, 16, 17, 18, 19, 20, 25];
  }

  getCricketHitCount(player: any, value: number): number {
    return player.cricketMap.get(value) || 0;
  }

  openPlayersOverviewDialog() {
    this.dialog.open(HiddenPlayersDialog)
  }
}
