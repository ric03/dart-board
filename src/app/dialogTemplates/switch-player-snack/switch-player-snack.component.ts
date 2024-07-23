import {Component, inject, OnInit} from '@angular/core';
import {CurrentPlayerService} from "../../services/current-player.service";
import {PlayerService} from "../../services/player.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-switch-player-snack',
  templateUrl: './switch-player-snack.component.html',
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


}
