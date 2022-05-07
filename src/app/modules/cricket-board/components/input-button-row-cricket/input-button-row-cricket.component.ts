import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatBadge} from '@angular/material/badge';
import {MatButtonToggleChange} from "@angular/material/button-toggle";
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

  readonly multiplier: FormControl = new FormControl('1');
  buttonColor: ThemePalette = 'primary';
  matBadgeHidden: MatBadge["_hidden"] = true;


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

  score(points: number) {
    // bullsEye
    if (points == 50) {
      this.cricketService.setMultiplier(2);
    }
    // bull
    if (points == 25) {
      this.cricketService.setMultiplier(1);
    }
    this.matBadgeHidden = false;
    this.cricketService.score(points);
  }

  scoreWithMultiplier(primaryNumber: number) {
    this.cricketService.setMultiplier(this.multiplier.value);
    this.matBadgeHidden = false;
    this.cricketService.score(primaryNumber * +this.multiplier.value);

  }

  getBadgeCountValue(primaryNumber: number) {
    return this.currentPlayerService._currentPlayer.cricketMap.get(primaryNumber);
  }
}
