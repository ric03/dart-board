import {Component} from '@angular/core';
import {CurrentPlayerService} from "../../services/current-player.service";

@Component({
  selector: 'app-victory-dialog',
  template: `
    <h1 mat-dialog-title>Congratulations, {{ currentPlayerService._currentPlayer.name }}. You have won.</h1>
    <div mat-dialog-content>Do you want to play again?</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close="" routerLink="/">Yes, let's play darts!</button>
      <button mat-button mat-dialog-close="">No, stay here and look around.</button>
    </div>
  `,
  styles: []
})
export class VictoryDialog {

  constructor(public currentPlayerService: CurrentPlayerService,
  ) {
  }
}
