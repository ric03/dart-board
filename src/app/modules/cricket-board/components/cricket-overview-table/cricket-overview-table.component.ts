import {Component} from '@angular/core';
import {PlayerService} from 'src/app/services/player.service';

@Component({
  selector: 'app-cricket-overview-table',
  templateUrl: './cricket-overview-table.component.html',
  styleUrls: ['./cricket-overview-table.component.scss']
})
export class CricketOverviewTableComponent {
 showPlayerDetails: boolean = false;

  constructor(public playerService: PlayerService,
  ) {
  }

  showAllPlayerdetails() {
    this.showPlayerDetails = !this.showPlayerDetails;
  }
}
