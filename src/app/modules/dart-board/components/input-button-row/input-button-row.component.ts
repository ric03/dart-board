import {Component} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {MatButtonToggle, MatButtonToggleChange} from "@angular/material/button-toggle";
import {ThemePalette} from "@angular/material/core";
import {DartService} from "../../../../services/dart.service";
import {CurrentPlayerService} from "../../../../services/current-player.service";
import {distinctUntilChanged} from "rxjs";


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
export class InputButtonRowComponent {

  readonly multiplierControl: UntypedFormControl = new UntypedFormControl('1');
  buttonColor: ThemePalette = 'primary';
  twentyButtons: InputButton[] = [];
  tempBadgeValue: number = 1
  matBadgeHiddenBull: boolean = true;
  matBadgeHiddenBullsEye: boolean = true;
  bullBadgeCount: string | number | undefined | null;
  bullsEyeBadgeCount: string | number | undefined | null;
  matBadgeHiddenMiss: boolean = true;
  missBadgeCount: string | number | undefined | null;

  constructor(public dartService: DartService, private currentPlayerService: CurrentPlayerService
  ) {

    for (let i = 0; i < 20; i++) {
      this.twentyButtons.push({zahl: i + 1, badge: true});
    }
    currentPlayerService._last3History.pipe(distinctUntilChanged())
      .subscribe(() => {
        this.resetBadges()
      })
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
    this.matBadgeHiddenBull = false;
    this.bullBadgeCount = this.getBadgeCountValue();
    this.setBadgeCount();
  }

  scoreBullsEye() {
    this.dartService.score({value: 25, multiplier: 2});
    this.matBadgeHiddenBullsEye = false;
    this.bullsEyeBadgeCount = this.getBadgeCountValue();
    this.setBadgeCount();
  }

  scoreMiss() {
    this.dartService.score({value: 0, multiplier: 1});
    this.matBadgeHiddenMiss = false;
    this.missBadgeCount = this.getBadgeCountValue();
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
    this.tempBadgeValue = this.tempBadgeValue + 1
  }

  getBadgeCountValue() {
    return this.tempBadgeValue;
  }

  public resetBadges() {
    this.tempBadgeValue = 1
    this.matBadgeHiddenBull = true;
    this.matBadgeHiddenBullsEye = true;
    this.matBadgeHiddenMiss = true;
    this.twentyButtons.forEach(input => {
      input.badge = true
      input.badgeValue = undefined;
    });
  }
}
