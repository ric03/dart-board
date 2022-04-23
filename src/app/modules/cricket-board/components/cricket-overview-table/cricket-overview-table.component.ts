import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HiddenPlayersDialog } from 'src/app/dialogTemplates/hidden-players-dialog/hidden-players-dialog.component';
import { CricketService } from 'src/app/services/cricket.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-cricket-overview-table',
  templateUrl: './cricket-overview-table.component.html',
  styleUrls: ['./cricket-overview-table.component.scss']
})
export class CricketOverviewTableComponent {

  constructor(public playerService: PlayerService, private dialog: MatDialog
  ) {
  }

  showAllPlayers() {
    this.dialog.open(HiddenPlayersDialog)
  }
}
