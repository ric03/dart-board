import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { QuitConfirmationDialog } from '../modals/quit-confirmation-dialog/quit-confirmation-dialog.component';
import { VictoryDialog } from "../modals/victory-dialog/victory-dialog.component";
import { CurrentPlayerService } from "./current-player.service";
import { Player } from './player.model';
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
  static createPlayer(name: string, id: number): Player {
    return { id, name, remainingPoints: 0, lastScore: 0, history: [0] };
  }

  constructor(private playerService: PlayerService,
    private currentPlayerService: CurrentPlayerService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
  }

  initPlayers(playerNames: string[]) {
    this.playerService.setupCricketPlayers(playerNames);
    this.currentPlayerService.init(this.playerService.getFirstPlayer());
  }
  // anpassen
  score(points: number) {
    this.currentPlayerService.score(points);
    if (this.currentPlayerService.hasNoThrowsRemaining()) {
      this.currentPlayerService.applyPoints();
      this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
    }
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
}
