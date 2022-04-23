import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { QuitConfirmationDialog } from '../dialogTemplates/quit-confirmation-dialog/quit-confirmation-dialog.component';
import { VictoryDialog } from "../dialogTemplates/victory-dialog/victory-dialog.component";
import { CurrentPlayerService } from "./current-player.service";
import { Player } from '../modals/player/player.model';
import { PlayerService } from "./player.service";

@Injectable({
  providedIn: 'root'
})
export class CricketService {
  /** Hier muss man sich die ersten 3 Treffer merken für jedes element
   * also 15,16..20,Bull
   *
   * erst danach kann man punkten
   *
   * gewonnen hat der mit den meisten Punkten, nach erreichen des Rundenlimits
   * oder
   * derjenige der alles 3mal getroffen hat && die meisten Punkte hat
   *
  */
  multiplier: number = 1;
  playerNames: string[] = [];
  roundCount: number = 0;
  public _gameType: string = '';

  static createPlayer(name: string, id: number): Player {
    return { id, name, remainingPoints: 0, lastScore: 0, history: [], cricketMap: new Map(), average: 0 };
  }

  constructor(private playerService: PlayerService,
    private currentPlayerService: CurrentPlayerService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
  }

  setGameType(gameType: string) {
    this._gameType = gameType;
  }

  initPlayers(playerNames: string[]) {
    this.playerNames = playerNames;
    this.playerService.setupCricketPlayers(playerNames);
    this.roundCount = 1;
    this.currentPlayerService.init(this.playerService.getFirstPlayer());
  }

  // anpassen
  score(points: number) {
    this.currentPlayerService.scoreCricket(points, this.multiplier);
    if (this.currentPlayerService.hasNoThrowsRemaining()) {
      this.currentPlayerService.applyCricketPoints();
      this.switchPlayer();
    }
   this.currentPlayerService.sortMap();
  }

  //entfällt
  private displayOvershotNotification() {
    const playerName = this.currentPlayerService._currentPlayer.name;
    this.snackbar.open(`Sorry ${playerName}, you have overshot. Switching players.`, 'OK', { duration: 3000 })
  }

  //bleibt
  private async handleVictory() {
    this.dialog.open(VictoryDialog);
    // TO DO: Open PointsOverview as Option
    setTimeout(() => {
      this.dialog.closeAll();
      this.dialog.open(QuitConfirmationDialog);
    }, 4000);


  }

  getMultiplier() {
    return this.multiplier;
  }

  setMultiplier(multiplier: number) {
    this.multiplier = multiplier;
  }
  private switchPlayer() {
    this.inkrementRoundCount();
    this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
  }

  inkrementRoundCount() {
    if (this.currentPlayerService._currentPlayer.name == this.playerNames[this.playerNames.length - 1]) {
      this.currentPlayerService._rounds = this.roundCount += 1
    }
  }
}
