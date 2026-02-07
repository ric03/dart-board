import {Injectable, signal} from '@angular/core';
import {Game, GameSnapshot} from '../models/game/game.model';
import {Player} from '../models/player/player.model';
import {GameType} from '../models/enum/GameType';

@Injectable({
  providedIn: 'root'
})
export class GameStoreService {
  private history: GameSnapshot[] = [];

  gameState = signal<Game | null>(null);

  initGame(gameType: GameType, players: Player[]) {
    const initialGame: Game = {
      gameType,
      players: players,
      currentPlayerIndex: 0,
      roundCount: 1,
      remainingThrows: 3,
      accumulatedPoints: 0
    };
    this.history = [];
    this.saveSnapshot(initialGame);
  }

  saveSnapshot(game: Game) {
    // Wir speichern eine tiefe Kopie des Zustands
    // Da Map nicht nativ von JSON.stringify unterstützt wird, nutzen wir einen Replacer
    const snapshotStr = JSON.stringify(game, (key, value) => {
      if (value instanceof Map) {
        return {
          _type: 'Map',
          value: Array.from(value.entries()),
        };
      }
      return value;
    });

    const snapshot: GameSnapshot = {
      game: JSON.parse(snapshotStr, (key, value) => {
        if (typeof value === 'object' && value !== null && value._type === 'Map') {
          return new Map(value.value);
        }
        return value;
      }),
      timestamp: Date.now()
    };
    this.history.push(snapshot);
    this.gameState.set(snapshot.game);
  }

  undo() {
    if (this.history.length > 1) {
      this.history.pop(); // Den aktuellen Zustand entfernen
      const lastSnapshot = this.history[this.history.length - 1];
      // Wiederum tiefe Kopie sicherstellen
      const restoredGame = JSON.parse(JSON.stringify(lastSnapshot.game, (key, value) => {
        if (value instanceof Map) {
          return {
            _type: 'Map',
            value: Array.from(value.entries()),
          };
        }
        return value;
      }), (key, value) => {
        if (typeof value === 'object' && value !== null && value._type === 'Map') {
          return new Map(value.value);
        }
        return value;
      });
      this.gameState.set(restoredGame);
      return restoredGame;
    }
    return null;
  }
}
