import {Component, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {ThemePalette} from "@angular/material/core";
import {DartService} from "../../../../services/dart.service";
import {BadgeHandleService} from "../../../../services/badge-handle.service";
import {ExplosionAnimationService} from "../../../../shared/animation/explosion-animation.service";
import {customRipple} from "../../../../shared/util";


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

  public dartService: DartService = inject(DartService)
  protected badgeHandleService: BadgeHandleService = inject(BadgeHandleService)
  protected animationService = inject(ExplosionAnimationService)
  public screenOrientation: OrientationType = window.screen.orientation.type;
  protected readonly customRipple = customRipple;

  @ViewChild('toggleGroup') toogleGroup?: MatButtonToggleGroup;
  @ViewChild('singelToggel') singleToggle?: MatButtonToggle;
  @ViewChild('singelToggel2') singleToggle2?: MatButtonToggle;

  // Überwache Orientierungsänderungen
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
    this.updateOrientation();
  }

  // Überwache auch Größenänderungen für Browser, die orientationchange nicht unterstützen
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateOrientation();
  }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      if (this.badgeHandleService.twentyButtons.length <= 19) {
        this.badgeHandleService.twentyButtons.push({zahl: i + 1, badge: true});
      }
    }
    this.updateOrientation()
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
    this.animationService.showExplosion('Bullseye');
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

  scoreWithMultiplier(inputButton: InputButton) {
    const multiplier: number = +this.multiplierControl.value;
    this.resetToggleState();
    this.setBadgeCount(inputButton);
    this.dartService.score({value: inputButton.zahl, multiplier: multiplier});
    if (multiplier === 3) {
      if (inputButton.zahl === 20) {
        this.animationService.tripleTwentyCounter++
        if (this.animationService.tripleTwentyCounter === 3) {
          this.animationService.showExplosion('180');
        } else {
          this.animationService.showExplosion('T' + inputButton.zahl.toString());
        }
      } else {
        this.animationService.showExplosion('T' + inputButton.zahl.toString());
      }
    }
  }

  private resetToggleState() {
    (this.singleToggle ?? this.singleToggle2)!._buttonElement.nativeElement.click();
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

  private updateOrientation() {
    // Bestimme die aktuelle Orientierung
    if (window) {
      this.screenOrientation = (window.innerHeight > window.innerWidth ? 'portrait-primary' : 'landscape-primary') as OrientationType;
    } else {
      this.screenOrientation = ' portrait-primary' as OrientationType
    }
  }
}
