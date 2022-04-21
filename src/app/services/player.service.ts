import { Injectable } from '@angular/core';
import { CricketService } from './cricket.service';
import { DartService } from './dart.service';
import { Player } from "../modals/player/player.model";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public _players: Player[] = [];

  setupDartPlayers(playerNames: string[]) {
    if (playerNames.length == 0) {
      throw new Error('Provided array must not be empty');
    }
    this._players = playerNames.map(DartService.createPlayer);
  }
  setupCricketPlayers(playerNames: string[]) {
    if (playerNames.length == 0) {
      throw new Error('Provided array must not be empty');
    }
    this._players = playerNames.map(CricketService.createPlayer);
  }

  getFirstPlayer(): Player {
    return this._players[0];
  }

  getNextPlayer(currentPlayer: Player): Player {
    const indexOfCurrentPlayer = this._players.findIndex(({ id }) => id == currentPlayer.id)
    const indexOfNextPlayer = this.getIndexOfNextPlayer(indexOfCurrentPlayer);
    return this._players[indexOfNextPlayer]
  }

  private getIndexOfNextPlayer(indexOfCurrentPlayer: number) {
    const nextIndex = indexOfCurrentPlayer + 1;
    if (nextIndex >= this._players.length) {
      return 0;
    } else {
      return nextIndex
    }
  }
}
