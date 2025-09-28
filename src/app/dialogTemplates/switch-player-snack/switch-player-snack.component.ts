import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CurrentPlayerService} from "../../services/current-player.service";
import {PlayerService} from "../../services/player.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {CricketService} from "../../services/cricket.service";
import {Player} from "../../models/player/player.model";
import {CricketOverviewComponent} from "./cricket-overview/cricket-overview.component";

@Component({
  selector: 'app-switch-player-snack',
  templateUrl: './switch-player-snack.component.html',
  imports: [MatCardModule, MatButtonModule, CommonModule, CricketOverviewComponent],
  standalone: true
})
export class SwitchPlayerSnackComponent implements OnInit, OnDestroy {

  playerservice = inject(PlayerService)
  snackBarRef = inject(MatSnackBar);
  currentPlayerService = inject(CurrentPlayerService);
  cricketService = inject(CricketService);

  public timeLeft: number = 3;
  public nextPlayer: Player = this.playerservice.getNextPlayer(this.currentPlayerService._currentPlayer.value);
  public cricketKeys: number[] = [];


  ngOnInit(): void {
    this.startTimer();
    // Convert Map iterator to a stable array to avoid ExpressionChangedAfterItHasBeenCheckedError
    this.cricketKeys = Array.from(this.nextPlayer.cricketMap.keys());
    this.getAllButtonsToDisable(true)
  }

  ngOnDestroy(): void {
    this.getAllButtonsToDisable(false)
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

  private getAllButtonsToDisable(disabled: boolean) {
    // @ts-ignore
    for (const btn of document.getElementsByTagName("button")) {
      if (btn.innerText !== 'OK' && btn.innerText !== 'REVERT') {
        btn.disabled = disabled;
      }
    }
  }
}
