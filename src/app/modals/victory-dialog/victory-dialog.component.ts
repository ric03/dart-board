import {Component} from '@angular/core';
import {CurrentPlayerService} from "../../services/current-player.service";

@Component({
  selector: 'app-victory-dialog',
  template: `
    <div>
      <h1>Congratulations, {{ currentPlayerService._currentPlayer.name }}. You have won.</h1>
    </div>
  `,
  styles: []
})
export class VictoryDialog {

  constructor(public currentPlayerService: CurrentPlayerService,
  ) {
  }
}
