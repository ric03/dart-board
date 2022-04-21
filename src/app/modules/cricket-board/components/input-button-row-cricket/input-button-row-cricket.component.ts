import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {ThemePalette} from "@angular/material/core";
import {DartService} from "../../../../services/dart.service";

@Component({
  selector: 'app-input-button-row-cricket',
  templateUrl: './input-button-row-cricket.component.html',
  styleUrls: ['./input-button-row-cricket.component.scss'],
})
export class InputButtonRowCricketComponent {

  readonly sixButtons = [...Array(6)].map((_, index) => index + 15);
  multiplier: FormControl = new FormControl('1');
  buttonColor: ThemePalette = 'primary';

  constructor(private dartService: DartService,
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
    if (this.multiplier.value == 1 && points == 50) {
      this.dartService.setMultiplier(2);
    }
    this.dartService.score(points);
  }

  scoreWithMultiplier(primaryNumber: number) {
    this.dartService.setMultiplier(this.multiplier.value);
    this.dartService.score(primaryNumber * +this.multiplier.value);
  }
}
