import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-cricket-info-dialog',
  template: `
    <h1 mat-dialog-title>How to win Cricket</h1>
    <mat-dialog-content #content>
      <p>Der Spieler, der alle Felder ausgeworfen hat und dessen Punktzahl nicht geringer als die eines Gegners ist,
        gewinnt das Spiel.</p>
      <p> Der Spieler, der die höchste Punktzahl nach dem Rundenlimit hat, gewinnt das Spiel.</p>
      <p> Bei Punktgleichheit gewinnt der Spieler mit den meisten ausgeworfenen Feldern.</p>
      <p>Falls die Anzahl der ausgeworfenen Felder ebenfalls gleich ist,
        dann gibt es bis zu 10 mögliche zusätzliche Würfe, den Gewinner zu ermitteln.</p>
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
    NgIf,
  ],
  styles: []
})
export class CricketWinInstructionsDialog {

  openTranslation(content: string) {
    window.open(`https://translate.google.com/?hl=de&sl=de&tl=en&text=${content}&op=translate`);
  }
}
