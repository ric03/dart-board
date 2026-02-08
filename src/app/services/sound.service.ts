import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SoundService {

  readonly isSoundEnabled = signal<boolean>(true);

  private readonly VICTORY = 'assets/sounds/fanfare-trumpets.mp3'
  private readonly EXPLOSION = 'assets/sounds/firework-explosion.mp3'
  private readonly TRIPLE_BELL = 'assets/sounds/opening-bell-triple.mp3'
  private readonly GOOD_RESULT = 'assets/sounds/good-result.mp3'
  private readonly OH_YEAH = 'assets/sounds/oh-yeah.mp3'

  public playVictory() {
    this.playSound(this.VICTORY)
  }

  /**
   * @deprecated
   */
  public playExplosion() {
    this.playSound(this.EXPLOSION);
  }

  public playTripleBell() {
    this.playSound(this.TRIPLE_BELL)
  }

  public playGoodResult() {
    this.playSound(this.GOOD_RESULT)
  }

  public playOhYeah() {
    this.playSound(this.OH_YEAH)
  }

  private playSound(file: string) {
    if (!this.isSoundEnabled()) return;

    const audio = new Audio(file);
    audio.volume = 0.5;
    audio.play().catch(err => {
      console.error('Failed to play audio', err);
    });
  }
}
