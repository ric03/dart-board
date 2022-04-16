import {Injectable} from '@angular/core';
import {Player} from "./player.model";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public _players: Player[] = [];

  setupPlayers(playerNames: string[]) {
    if (playerNames.length == 0) {
      throw new Error('Provided array must not be empty');
    }
    this._players = playerNames.map(this.createPlayer501);
  }

  // FIXME separation of concern: this service should not handle the player-/game-type
  private createPlayer501(name: string, id: number): Player {
    return {id, name, remainingPoints: 501};
  }

  getFirstPlayer(): Player {
    return this._players[0];
  }

  getNextPlayer(currentPlayer: Player): Player {
    const indexOfCurrentPlayer = this._players.findIndex(({id}) => id == currentPlayer.id)
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
