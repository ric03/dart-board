import {Component, inject, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {NgForOf} from "@angular/common";
import {PlayerService} from "../../../services/player.service";
import {Player} from "../../../models/player/player.model";

@Component({
  selector: 'app-cricket-overview',
  standalone: true,
  imports: [MatButtonModule, MatRippleModule, NgForOf],
  templateUrl: './cricket-overview.component.html',
})
export class CricketOverviewComponent {
  public readonly border = "border border-5 border-success"
  public readonly gray = "bg-secondary"

  playerService = inject(PlayerService)

  readonly availableButtonValuesUnitl17: number[] = [15, 16, 17]
  readonly availableButtonValuesUnitl20: number[] = [18, 19, 20]


  @Input() nextPlayer!: Player;

  /**
   * nicht alle anderen Spieler haben das Feld geschlossen
   * @param value
   */
  isScorable(value: number) {
    if (this.playerService._players.length === 1) {
      return true;
    } else {
      const allOtherplayers = this.playerService._players.filter((player) => this.nextPlayer !== player)
      return allOtherplayers.some((player) =>
        player.cricketMap.get(value) !== 3)
    }
  }

  isClosed(value: number) {
    if (this.playerService._players.length === 1) {
      return false;
    }
    return this.nextPlayer.cricketMap.get(value) === 3;
  }

  getBadgeCountValue(primaryNumber: number) {
    return this.nextPlayer.cricketMap.get(primaryNumber) ?? "0";
  }
}
