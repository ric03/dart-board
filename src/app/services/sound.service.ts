import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SoundService {

  readonly isSoundEnabled = signal<boolean>(true);

  private readonly VICTORY = 'assets/sounds/freesound_community-success-fanfare-trumpets-6185.mp3'
  private readonly EXPLOSION = 'assets/sounds/firework-explosion.mp3'

  public playVictorySound(): void {
    this.playSound(this.VICTORY)
  }

  public playExplosionSound(): void {
    this.playSound(this.EXPLOSION);
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
