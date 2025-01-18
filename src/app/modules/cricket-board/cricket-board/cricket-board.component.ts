import {Component, inject, OnDestroy} from '@angular/core';
import {CricketService} from "../../../services/cricket.service";

@Component({
  selector: 'app-cricket-component',
  templateUrl: './cricket-board.component.html',
})
export class CricketBoardComponent implements OnDestroy {
  cricketService = inject(CricketService);

  ngOnDestroy(): void {
    this.cricketService._gameType = '';
  }
}
