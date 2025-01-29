import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-dart-info-dialog',
  template: `
    <h1 mat-dialog-title>How to win Dart</h1>
    <mat-dialog-content #content>
      <p> Wer zu erst Null hat gewinnt, sonst derjenige der am Ende der Rundenazahl die wenigsten Punkte hat.</p>
    </mat-dialog-content>
    <mat-dialog-actions class="justify-content-end">
      <button mat-button
              (click)="openTranslation(content.innerText)">
        translate
      </button>
      <button mat-button mat-dialog-close="">close</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatDialogModule,

  ],
  styles: []
})
export class DartInfoDialogComponent {

  openTranslation(content: string) {
    window.open(`https://translate.google.com/?hl=de&sl=de&tl=en&text=${content}&op=translate`);
  }
}
