import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {CurrentPlayerService} from "../../../services/current-player.service";
import {DartService} from "../../../services/dart.service";
import {CricketService} from "../../../services/cricket.service";
import {MatRipple} from "@angular/material/core";
import {ShapeMorphDirective} from "../../directive/shape-morph.directive";
import {customRipple} from "../../util";

@Component({
  selector: 'app-bottom-line',
  imports: [
    MatButton,
    MatRipple,
    ShapeMorphDirective
  ],
  templateUrl: './bottom-line.html',
  styleUrl: './bottom-line.scss',
})
export class BottomLine {
  private currentPlayerService = inject(CurrentPlayerService);
  private dartService = inject(DartService);
  private cricketService = inject(CricketService);
  protected readonly customRipple = customRipple;

  scoreMiss() {
    if (this.currentPlayerService.currentGameMode === 'Cricket') {
      this.cricketService.scoreCricketWithMultiplier({value: 0, multiplier: 1});
    } else {
      this.dartService.score({value: 0, multiplier: 1});
    }
  }
}
