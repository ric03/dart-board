import {Component, OnInit} from '@angular/core';
import {PlayerService} from 'src/app/services/player.service';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {GameType} from "../../models/enum/GameType";

@Component({
  selector: 'app-hidden-players-dialog',
  templateUrl: './hidden-players-dialog.component.html',
  imports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    NgForOf,
  ],
  standalone: true
})
export class HiddenPlayersDialog implements OnInit {
  protected readonly GameType = GameType;

  constructor(public dialogRef: MatDialogRef<HiddenPlayersDialog>, public playerService: PlayerService) {
  }

  ngOnInit() {
    this.dialogRef.updateSize('200%', '75%');
  }
}


