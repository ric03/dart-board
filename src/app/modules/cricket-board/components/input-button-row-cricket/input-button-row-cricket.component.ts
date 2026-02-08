import {ChangeDetectorRef, Component, HostListener, inject, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {CricketService} from 'src/app/services/cricket.service';
import {CurrentPlayerService} from 'src/app/services/current-player.service';
import {PlayerService} from "../../../../services/player.service";
import {ExplosionAnimationService} from "../../../../shared/animation/explosion-animation.service";
import {customRipple} from "../../../../shared/utils/util";
import {MultiplierService} from "../../../../services/multiplier.service";
import {SoundService} from "../../../../services/sound.service";


@Component({
  selector: 'app-input-button-row-cricket',
  templateUrl: './input-button-row-cricket.component.html',
  styleUrls: ['./input-button-row-cricket.component.scss'],
  standalone: false,
})
export class InputButtonRowCricketComponent implements OnInit {
  protected readonly customRipple = customRipple;

  readonly buttonGroups: number[][] = [[15, 16], [17, 18], [19, 20], [25, 50]];
  public readonly border = "border border-5 border-warning"

  protected animationService = inject(ExplosionAnimationService);
  protected multiplierService = inject(MultiplierService);
  private readonly cdr = inject(ChangeDetectorRef);
  public cricketService: CricketService = inject(CricketService);
  public currentPlayerService: CurrentPlayerService = inject(CurrentPlayerService);
  protected playerService: PlayerService = inject(PlayerService);
  public screenOrientation: OrientationType = window.screen.orientation.type;
  private readonly soundService = inject(SoundService);

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
    this.updateOrientation()
  }

  scoreBull() {
    this.cricketService.scoreCricketWithMultiplier({value: 25, multiplier: 1})
  }

  scoreBullsEye() {
    this.cricketService.scoreCricketWithMultiplier({value: 25, multiplier: 2})
    this.animationService.showExplosion('Bullseye');
    this.soundService.playGoodResult();
  }

  scoreHit(value: number) {
    let multiplier = this.multiplierService.getMultiplier();
    this.multiplierService.reset();

    if (multiplier === 3) {
      if (value === 20 && this.currentPlayerService._currentPlayer.value.cricketMap.get(value) === 3) {
        this.animationService.tripleTwentyCounter++
        if (this.animationService.tripleTwentyCounter === 3) {
          this.animationService.showExplosion('180');
          this.soundService.playOhYeah();
        } else {
          this.animationService.showExplosion('T' + value.toString());
          this.soundService.playTripleBell();
        }
      } else {
        this.animationService.showExplosion('T' + value.toString());
        this.soundService.playTripleBell();
      }
    }
    this.cricketService.scoreCricketWithMultiplier({value, multiplier});
  }

  getBadgeCountValue(primaryNumber: number) {
    return this.currentPlayerService._currentPlayer.value.cricketMap.get(primaryNumber) ?? "0";
  }

  isClosed(value: number) {
    if (this.playerService._players.length === 1) {
      return false;
    }
    if (value === 50 || value === 25) {
      if (value === 25) return this.currentPlayerService.isCricketBullClosed()
      if (value === 50) return this.currentPlayerService.isCricketBullClosed()
    }
    return this.currentPlayerService.isCricketNumberClosed(value)
  }

  isScorable(value: number) {
    if (this.playerService._players.length === 1) {
      return true;
    } else {
      const allOtherplayers = this.playerService._players.filter((player) => this.currentPlayerService._currentPlayer.value !== player)
      return allOtherplayers.some((player) =>
        player.cricketMap.get(value) !== 3)
    }
  }

  private updateOrientation() {
    this.screenOrientation = (window.innerHeight > window.innerWidth ? 'portrait-primary' : 'landscape-primary') as OrientationType;
  }

  justScore(value: number) {
    if (value === 25) {
      this.scoreBull()
    } else if (value === 50) {
      this.scoreBullsEye()
    } else {
      this.scoreHit(value)
    }

  }
}
