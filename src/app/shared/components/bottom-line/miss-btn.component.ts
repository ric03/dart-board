import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {CurrentPlayerService} from "../../../services/current-player.service";
import {DartService} from "../../../services/dart.service";
import {CricketService} from "../../../services/cricket.service";
import {BadgeHandleService} from "../../../services/badge-handle.service";
import {MatRipple} from "@angular/material/core";
import {ShapeMorphDirective} from "../../directive/shape-morph.directive";
import {customRipple} from "../../util";
import {MatBadgeModule} from "@angular/material/badge";

@Component({
  selector: 'app-miss-btn',
  imports: [
    MatButton,
    MatRipple,
    ShapeMorphDirective,
    MatBadgeModule
  ],
  templateUrl: './miss-btn.component.html',
})
export class MissBtn {
  private currentPlayerService = inject(CurrentPlayerService);
  private dartService = inject(DartService);
  private cricketService = inject(CricketService);
  protected badgeHandleService = inject(BadgeHandleService);
  protected readonly customRipple = customRipple;

  scoreMiss() {
    if (this.currentPlayerService.currentGameMode === 'Cricket') {
      this.cricketService.scoreCricketWithMultiplier({value: 0, multiplier: 1});
    } else {
      this.badgeHandleService.scoreMiss();
      this.dartService.score({value: 0, multiplier: 1});
    }
  }
}
