import { Component } from '@angular/core';
import { PlayerService } from "../../../../services/player.service";
import { HiddenPlayersDialog } from 'src/app/modals/hidden-players-dialog/hidden-players-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-scoreboard-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent {

  constructor(public playerService: PlayerService, private dialog: MatDialog
  ) {
  }

  showAllPlayers() {
    this.dialog.open(HiddenPlayersDialog)
  }
}
