import {Component} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {ThemePalette} from "@angular/material/core";
import {DartService} from "../../../../services/dart.service";

@Component({
  selector: 'app-input-button-row',
  templateUrl: './input-button-row.component.html',
  styleUrls: ['./input-button-row.component.scss'],
})
export class InputButtonRowComponent {

  readonly twentyButtons = [...Array(20)].map((_, index) => index + 1);
  readonly multiplierControl: UntypedFormControl = new UntypedFormControl('1');
  buttonColor: ThemePalette = 'primary';

  constructor(public dartService: DartService,
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
    this.dartService.score({value: 25, multiplier: 1})
  }

  scoreBullsEye() {
    this.dartService.score({value: 25, multiplier: 2})
  }

  scoreMiss() {
    this.dartService.score({value: 0, multiplier: 1})
  }

  scoreWithMultiplier(value: number) {
    const multiplier: number = +this.multiplierControl.value;
    this.dartService.score({value, multiplier});
  }
}
