import {Component, inject, OnInit} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {MatButtonToggle, MatButtonToggleChange} from "@angular/material/button-toggle";
import {ThemePalette} from "@angular/material/core";
import {DartService} from "../../../../services/dart.service";
import {BadgeHandleService} from "../../../../services/badge-handle.service";


export interface InputButton {
  zahl: number;
  badge: boolean;
  badgeValue?: number;
}

@Component({
  selector: 'app-input-button-row',
  templateUrl: './input-button-row.component.html',
  styleUrls: ['./input-button-row.component.scss'],
})
export class InputButtonRowComponent implements OnInit {

  readonly multiplierControl: UntypedFormControl = new UntypedFormControl('1');
  buttonColor: ThemePalette = 'primary';
  rippelRadius: number = 25;
  rippleColor: string = "orange";
  public dartService: DartService = inject(DartService)
  protected badgeHandleService: BadgeHandleService = inject(BadgeHandleService)

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      if (this.badgeHandleService.twentyButtons.length <= 19) {
        this.badgeHandleService.twentyButtons.push({zahl: i + 1, badge: true});
      }

    }
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
    this.dartService.score({value: 25, multiplier: 1});
    this.badgeHandleService.matBadgeHiddenBull = false;
    this.badgeHandleService.bullBadgeCount = this.getBadgeCountValue();
    this.setBadgeCount();
  }

  scoreBullsEye() {
    this.dartService.score({value: 25, multiplier: 2});
    this.badgeHandleService.matBadgeHiddenBullsEye = false;
    this.badgeHandleService.bullsEyeBadgeCount = this.getBadgeCountValue();
    this.setBadgeCount();
  }

  scoreMiss() {
    this.dartService.score({value: 0, multiplier: 1});
    this.badgeHandleService.matBadgeHiddenMiss = false;
    this.badgeHandleService.missBadgeCount = this.getBadgeCountValue();
    this.setBadgeCount();
  }

  scoreWithMultiplier(inputButton: InputButton, singelToggel: MatButtonToggle) {
    this.setBadgeCount(inputButton);
    const multiplier: number = +this.multiplierControl.value;
    this.dartService.score({value: inputButton.zahl, multiplier: multiplier});
    singelToggel._buttonElement.nativeElement.click();
  }

  private setBadgeCount(inputButton?: InputButton) {
    if (inputButton) {
      inputButton.badgeValue = this.getBadgeCountValue();
      inputButton.badge = false;
    }
    this.badgeHandleService.tempBadgeValue = this.badgeHandleService.tempBadgeValue + 1
  }

  getBadgeCountValue() {
    return this.badgeHandleService.tempBadgeValue;
  }
}
