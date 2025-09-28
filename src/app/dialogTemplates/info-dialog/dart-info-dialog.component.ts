import {Component, inject} from '@angular/core';
import {RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {GameType} from "../../models/enum/GameType";
import {CurrentPlayerService} from "../../services/current-player.service";


@Component({
  selector: 'app-dart-info-dialog',
  template: `
    <h1 mat-dialog-title>How to win {{ currentplayerService.currentGameMode }}</h1>
    <mat-dialog-content #content>
      @if (currentplayerService.currentGameMode === GameType.Elimination || GameType.Elimination501 || GameType.Elimination301) {
        <p> Wer zu erst die Endpunktzahl erreicht gewinnt, sonst derjenige der am Ende der Rundenazahl die meisten
          Punkte hat. Bei exakt der gleichen Punktzahl wird auf 0 zurückgesetzt.</p>
      } @else {
        <p> Wer zu erst Null hat gewinnt, sonst derjenige der am Ende der Rundenazahl die wenigsten Punkte hat.</p>
      }
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
  protected readonly GameType = GameType;
  protected currentplayerService = inject(CurrentPlayerService)

  openTranslation(content: string) {
    window.open(`https://translate.google.com/?hl=de&sl=de&tl=en&text=${content}&op=translate`);
  }
}
