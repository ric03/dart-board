import {Component} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {MatBadge} from '@angular/material/badge';
import {MatButtonToggle, MatButtonToggleChange} from "@angular/material/button-toggle";
import {ThemePalette} from "@angular/material/core";
import {CricketService} from 'src/app/services/cricket.service';
import {CurrentPlayerService} from 'src/app/services/current-player.service';


@Component({
  selector: 'app-input-button-row-cricket',
  templateUrl: './input-button-row-cricket.component.html',
  styleUrls: ['./input-button-row-cricket.component.scss'],
})
export class InputButtonRowCricketComponent {

  readonly availableButtonValues: number[] = [15, 16, 17, 18, 19, 20]

  readonly multiplierControl: UntypedFormControl = new UntypedFormControl('1');
  buttonColor: ThemePalette = 'primary';
  isMatBadgeHidden: MatBadge['hidden'] = true;


  constructor(public cricketService: CricketService,
              public currentPlayerService: CurrentPlayerService
  ) {
  }

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
    this.cricketService.score({value: 25, multiplier: 1})
  }

  scoreBullsEye() {
    this.cricketService.score({value: 25, multiplier: 2})
  }

  scoreMiss() {
    this.cricketService.score({value: 0, multiplier: 1})
  }

  scoreWithMultiplier(value: number, singelToggel: MatButtonToggle) {
    this.isMatBadgeHidden = false;

    const multiplier = +this.multiplierControl.value;
    this.cricketService.score({value, multiplier});
    singelToggel._buttonElement.nativeElement.click();
  }

  getBadgeCountValue(primaryNumber: number) {
    return this.currentPlayerService._currentPlayer.cricketMap.get(primaryNumber);
  }
}
