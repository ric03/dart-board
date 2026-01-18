import {Component, inject} from '@angular/core';
import {CurrentPlayerService} from "../../../services/current-player.service";
import {RoundCountService} from "../../../services/round-count.service";
import {PlayerService} from "../../../services/player.service";
import {GameType} from "../../../models/enum/GameType";

@Component({
  selector: 'app-current-player-progress',
  templateUrl: './current-player-progress.component.html',
  styleUrls: ['./current-player-progress.component.scss'],
  standalone: false,
})
export class CurrentPlayerProgressComponent {
  public playerService = inject(PlayerService);
  protected readonly GameType = GameType;

  constructor(public currentPlayerService: CurrentPlayerService,
              public roundCountService: RoundCountService,
  ) {
  }

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

  getDiffToNextPlayer(): number {
    const players = this.playerService._players;
    if (players.length < 2) return 0;
    const current = this.currentPlayerService._currentPlayer.value;
    const currentIndex = players.indexOf(current);
    const nextIndex = (currentIndex + 1) % players.length;
    const nextPlayer = players[nextIndex];

    const currentPoints = this.currentPlayerService._remainingPointsToDisplay();
    return Math.abs(currentPoints - nextPlayer.remainingPoints);
  }

  getDiffToCurrentPlayer(player: any): number {
    const currentPoints = this.currentPlayerService._remainingPointsToDisplay();
    return Math.abs(currentPoints - player.remainingPoints);
  }

  getCricketValues(): number[] {
    return [20, 19, 18, 17, 16, 15, 25];
  }

  getCricketHitCount(player: any, value: number): number {
    return player.cricketMap.get(value) || 0;
  }
}
