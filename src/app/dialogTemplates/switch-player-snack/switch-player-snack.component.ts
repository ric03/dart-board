import {Component, inject, OnInit} from '@angular/core';
import {CurrentPlayerService} from "../../services/current-player.service";
import {PlayerService} from "../../services/player.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {CricketService} from "../../services/cricket.service";

@Component({
  selector: 'app-switch-player-snack',
  templateUrl: './switch-player-snack.component.html',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  standalone: true
})
export class SwitchPlayerSnackComponent implements OnInit {

  public timeLeft: number = 5;
  public nextPlayer = inject(PlayerService).getNextPlayer(inject(CurrentPlayerService)._currentPlayer.value);
  snackBarRef = inject(MatSnackBar);
  currentPlayerService = inject(CurrentPlayerService);
  cricketService = inject(CricketService);


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
