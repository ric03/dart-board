import {Component, inject} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {MatButtonToggle, MatButtonToggleChange} from "@angular/material/button-toggle";
import {ThemePalette} from "@angular/material/core";
import {CricketService} from 'src/app/services/cricket.service';
import {CurrentPlayerService} from 'src/app/services/current-player.service';
import {PlayerService} from "../../../../services/player.service";
import {ExplosionAnimationService} from "../../../../shared/animation/explosion-animation.service";
import {CircketOverviewService} from "../../../../services/circket-overview.service";


@Component({
  selector: 'app-input-button-row-cricket',
  templateUrl: './input-button-row-cricket.component.html',
  styleUrls: ['./input-button-row-cricket.component.scss'],
})
export class InputButtonRowCricketComponent {

  readonly availableButtonValuesUnitl17: number[] = [15, 16, 17]
  readonly availableButtonValuesUnitl20: number[] = [18, 19, 20]
  public readonly border = "border border-5 border-warning"

  readonly multiplierControl: UntypedFormControl = new UntypedFormControl('1');
  buttonColor: ThemePalette = 'primary';
  rippelRadius: number = 25
  rippleColor: string = "orange";
  protected animationService = inject(ExplosionAnimationService)
  protected readonly cricketOverviewService = inject(CircketOverviewService);
  public cricketService: CricketService = inject(CricketService);
  public currentPlayerService: CurrentPlayerService = inject(CurrentPlayerService);
  private readonly playerService: PlayerService = inject(PlayerService);

  changeButtonColor({value}: MatButtonToggleChange) {
    switch (value) {
      // @formatter:off
      case '1': this.buttonColor = 'primary'; break;
      case '2': this.buttonColor = 'accent'; break;
      case '3': this.buttonColor = 'warn'; break;
      default: throw new Error('Unknown value');
      // @formatter:on
    }
  }

  scoreBull() {
    this.cricketService.scoreCricketWithMultiplier({value: 25, multiplier: 1})
  }

  scoreBullsEye() {
    this.cricketService.scoreCricketWithMultiplier({value: 25, multiplier: 2})
    this.animationService.showExplosion('Bullseye');
  }

  scoreMiss() {
    this.cricketService.scoreCricketWithMultiplier({value: 0, multiplier: 1})
  }

  scoreHit(value: number, singelToggel: MatButtonToggle) {
    let multiplier = +this.multiplierControl.value;

    if (multiplier === 3) {
      if (value === 20 && this.currentPlayerService._currentPlayer.value.cricketMap.get(value) === 3) {
        this.animationService.tripleTwentyCounter++
        console.log(this.animationService.tripleTwentyCounter)
        if (this.animationService.tripleTwentyCounter === 3) {
          this.animationService.showExplosion('180');
        } else {
          this.animationService.showExplosion('T' + value.toString());
        }
      } else {
        this.animationService.showExplosion('T' + value.toString());
      }
    }
    this.cricketService.scoreCricketWithMultiplier({value, multiplier});
    singelToggel._buttonElement.nativeElement.click();
  }

  getBadgeCountValue(primaryNumber: number) {
    return this.currentPlayerService._currentPlayer.value.cricketMap.get(primaryNumber) ?? "0";
  }

  isClosed(value: number) {
    if (this.playerService._players.length === 1) {
      return false;
    }
    return this.getBadgeCountValue(value) === 3 && this.playerService._players.every((player) =>
      player.cricketMap.get(value) === 3
    )
  }

  /**
   * nicht alle anderen Spieler haben das Feld geschlossen
   * @param value
   */
  isScorable(value: number) {
    if (this.playerService._players.length === 1) {
      return true;
    } else {
      const allOtherplayers = this.playerService._players.filter((player) => this.currentPlayerService._currentPlayer.value !== player)
      return allOtherplayers.some((player) =>
        player.cricketMap.get(value) !== 3)
    }

  }


}
