import { Component } from '@angular/core';

@Component({
  selector: 'app-quit-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>End</h1>
    <div mat-dialog-content>Do you want to play again?</div>
    <div mat-dialog-actions>
      <button mat-button routerLink='' mat-dialog-close>Yes, let's play darts!</button>
      <button mat-button mat-dialog-close>No, stay here and look around.</button>
    </div>
  `,
  styles: []
})
export class QuitConfirmationDialog {
}

// FIXME missing mat-button and mat-dialog-close attribute --> @Tom ist das noch nötig?
