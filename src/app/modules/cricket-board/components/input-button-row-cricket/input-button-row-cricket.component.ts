import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatBadge } from '@angular/material/badge';
import { MatButtonToggleChange } from "@angular/material/button-toggle";
import { ThemePalette } from "@angular/material/core";
import { CricketService } from 'src/app/services/cricket.service';

@Component({
  selector: 'app-input-button-row-cricket',
  templateUrl: './input-button-row-cricket.component.html',
  styleUrls: ['./input-button-row-cricket.component.scss'],
})
export class InputButtonRowCricketComponent {

  readonly sixButtons = [...Array(6)].map((_, index) => index + 15);
  multiplier: FormControl = new FormControl('1');
  buttonColor: ThemePalette = 'primary';
  matbadge: MatBadge["_content"] = 0;

  constructor(private cricketservice: CricketService,
  ) {
  }

  changeButtonColor({ value }: MatButtonToggleChange) {
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
      this.cricketservice.setMultiplier(2);
      this.setMatBageMultiplier(50);
    }
    // bull
    if (points == 25) {
      this.cricketservice.setMultiplier(1);
      this.setMatBageMultiplier(25);
    }
    this.cricketservice.score(points);
  }

  scoreWithMultiplier(primaryNumber: number) {
    this.cricketservice.setMultiplier(this.multiplier.value);
    this.setMatBageMultiplier(primaryNumber);
    this.cricketservice.score(primaryNumber * +this.multiplier.value);

  }

  setMatBageMultiplier(primaryNumber: number) {
    if (this.matbadge._id == primaryNumber) {
      this.matbadge = this.cricketservice.getMultiplier();
    }

  }
}
