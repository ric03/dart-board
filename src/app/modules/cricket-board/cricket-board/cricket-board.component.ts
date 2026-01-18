import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CricketService} from "../../../services/cricket.service";
import {ToggleFullscreenService} from "../../../services/toggle-fullscreen.service";

@Component({
  selector: 'app-cricket-component',
  templateUrl: './cricket-board.component.html',
  standalone: false,
})
export class CricketBoardComponent implements OnDestroy, OnInit {
  cricketService = inject(CricketService);
  protected readonly fullscreenService = inject(ToggleFullscreenService);

  ngOnInit(): void {
    this.fullscreenService.toggleTabFullScreenModeGame()
  }

  ngOnDestroy(): void {
    this.cricketService._gameType = '';
  }
}
