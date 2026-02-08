import {ChangeDetectorRef, Component, HostListener, inject, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {DartService} from "../../../../services/dart.service";
import {BadgeHandleService} from "../../../../services/badge-handle.service";
import {ExplosionAnimationService} from "../../../../shared/animation/explosion-animation.service";
import {customRipple} from "../../../../shared/utils/util";
import {MultiplierService} from "../../../../services/multiplier.service";
import {CurrentPlayerService} from "../../../../services/current-player.service";
import {SoundService} from "../../../../services/sound.service";


export interface InputButton {
  zahl: number;
  badge: boolean;
  badgeValue?: number;
}

@Component({
  selector: 'app-input-button-row',
  templateUrl: './input-button-row.component.html',
  styleUrls: ['./input-button-row.component.scss'],
  standalone: false,
})
export class InputButtonRowComponent implements OnInit {

  public dartService: DartService = inject(DartService)
  protected badgeHandleService: BadgeHandleService = inject(BadgeHandleService)
  protected animationService = inject(ExplosionAnimationService)
  protected multiplierService = inject(MultiplierService);
  private readonly cdr = inject(ChangeDetectorRef);
  protected currentPlayerService = inject(CurrentPlayerService);
  protected soundService = inject(SoundService);

  public screenOrientation: OrientationType = window.screen.orientation.type;
  protected readonly customRipple = customRipple;

  public readonly buttonGroups: InputButton[][] = [];

  get buttonColor(): ThemePalette {
    const m = this.multiplierService.multiplier();
    if (m === 2) return 'accent';
    if (m === 3) return 'warn';
    return 'primary';
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateOrientation();
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    if (this.badgeHandleService.twentyButtons.length === 0) {
      for (let i = 0; i < 20; i++) {
        this.badgeHandleService.twentyButtons.push({zahl: i + 1, badge: true});
      }
    }
    this.groupButtons();
    this.updateOrientation()
  }

  private groupButtons() {
    const btns = this.badgeHandleService.twentyButtons;
    // 1-5, 6-10, 11-15, 16-20
    for (let i = 0; i < 4; i++) {
      this.buttonGroups.push(btns.slice(i * 5, (i + 1) * 5));
    }
  }

  scoreBull() {
    this.badgeHandleService.matBadgeHiddenBull = false;
    this.badgeHandleService.bullBadgeCount = this.getBadgeCountValue();
    this.setBadgeCount();
    this.dartService.score({value: 25, multiplier: 1});
  }

  scoreBullsEye() {
    this.badgeHandleService.matBadgeHiddenBullsEye = false;
    this.badgeHandleService.bullsEyeBadgeCount = this.getBadgeCountValue();
    this.setBadgeCount();
    this.dartService.score({value: 25, multiplier: 2});
    this.animationService.showExplosion('Bullseye');
    this.soundService.playExplosionSound();
  }

  scoreWithMultiplier(inputButton: InputButton) {
    const multiplier = this.multiplierService.getMultiplier();
    this.multiplierService.reset();
    if (inputButton.badge) {
      this.setBadgeCount(inputButton);
    }
    this.dartService.score({value: inputButton.zahl, multiplier: multiplier});
    if (multiplier === 3) {
      if (inputButton.zahl === 20) {
        this.animationService.tripleTwentyCounter++
        if (this.animationService.tripleTwentyCounter === 3) {
          this.animationService.showExplosion('180');
          this.soundService.playExplosionSound();
        } else {
          this.animationService.showExplosion('T' + inputButton.zahl.toString());
          this.soundService.playExplosionSound();
        }
      } else {
        this.animationService.showExplosion('T' + inputButton.zahl.toString());
        this.soundService.playExplosionSound();
      }
    }
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
    this.screenOrientation = (window.innerHeight > window.innerWidth ? 'portrait-primary' : 'landscape-primary') as OrientationType;
  }
}
