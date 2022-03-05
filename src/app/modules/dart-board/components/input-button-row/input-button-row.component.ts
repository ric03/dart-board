import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
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
    this.dartService.score(points);
  }

  scoreWithMultiplier(primaryNumber: number) {
    this.dartService.score(primaryNumber * +this.multiplier.value);
  }
}
