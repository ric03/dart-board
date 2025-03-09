import {Component, inject} from '@angular/core';
import {PlayerService} from 'src/app/services/player.service';
import {CircketOverviewService} from "../../../../services/circket-overview.service";

@Component({
  selector: 'app-cricket-overview-table',
  templateUrl: './cricket-overview-table.component.html',
})
export class CricketOverviewTableComponent {
  protected cricketOverviewService = inject(CircketOverviewService);
  public playerService = inject(PlayerService)


}
