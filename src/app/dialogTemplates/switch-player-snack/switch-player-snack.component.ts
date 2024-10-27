import {Component, inject, OnInit} from '@angular/core';
import {CurrentPlayerService} from "../../services/current-player.service";
import {PlayerService} from "../../services/player.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {HistoryEntry} from "../../models/player/player.model";

@Component({
  selector: 'app-switch-player-snack',
  templateUrl: './switch-player-snack.component.html',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  standalone: true
})
export class SwitchPlayerSnackComponent implements OnInit {

  public timeLeft: number = 5;
  public nextPlayer = inject(PlayerService).getNextPlayer(inject(CurrentPlayerService)._currentPlayer.value).name;
  snackBarRef = inject(MatSnackBar);
  currentPlayerService = inject(CurrentPlayerService);

  ngOnInit(): void {
    this.startTimer();
  }


  startTimer() {
    setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;
      } else {
        return
      }
    }, 1000);
  }


  getCurrentPlayerHistory(): HistoryEntry {
    if (this.currentPlayerService._currentPlayer.value.history.length > 0) {
      return this.currentPlayerService._currentPlayer.value.history[
        this.currentPlayerService._currentPlayer.value.history.length > 0 ?
          this.currentPlayerService._currentPlayer.value.history.length - 1 :
          this.currentPlayerService._currentPlayer.value.history.length];
    }
    return {hits: [0], sum: 0};

  }
}
