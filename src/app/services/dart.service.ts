import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VictoryDialog} from "../modals/victory-dialog/victory-dialog.component";
import {CurrentPlayerService} from "./current-player.service";
import {PlayerService} from "./player.service";

@Injectable({
  providedIn: 'root'
})
export class DartService {

  constructor(private playerService: PlayerService,
              private currentPlayerService: CurrentPlayerService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
  ) {
  }

  initPlayers(playerNames: string[]) {
    this.playerService.setupPlayers(playerNames);
    this.currentPlayerService.init(this.playerService.getFirstPlayer());
  }

  score(points: number) {
    if (this.currentPlayerService.isOvershot(points)) {
      this.displayOvershotNotification();
      this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
    } else {
      this.currentPlayerService.score(points);
      if (this.currentPlayerService.hasReachedZeroPoints()) {
        this.currentPlayerService.applyPoints();
        this.handleVictory();
      } else {
        if (this.currentPlayerService.hasNoThrowsRemaining()) {
          this.currentPlayerService.applyPoints();
          this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
        }
      }
    }
  }

  private displayOvershotNotification() {
    const playerName = this.currentPlayerService._currentPlayer.name;
    this.snackbar.open(`Sorry ${playerName}, you have overshot. Switching players.`, 'OK', {duration: 1500})
  }

  private handleVictory() {
    this.dialog.open(VictoryDialog)
  }
}
