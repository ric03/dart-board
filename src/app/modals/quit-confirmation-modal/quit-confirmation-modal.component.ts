import {Component} from '@angular/core';

@Component({
  selector: 'app-quit-confirmation-modal',
  template: `
    <h1 mat-dialog-title>End</h1>
    <div mat-dialog-content>Do you want to play again?</div>
    <div mat-dialog-actions>
      <button mat-button routerLink="" mat-dialog-close>OK</button>
      <button mat-button mat-dialog-close>STAY HERE</button>
    </div>
  `,
  styles: []
})
export class QuitConfirmationModalComponent {
}

// FIXME missing mat-button and mat-dialog-close attribute
