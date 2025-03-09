import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExplosionAnimationService {
  private renderer: Renderer2;
  private explosionElement: HTMLElement | null = null;
  tripleTwentyCounter: number = 0;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Zeigt eine Explosionsanimation wie eine Silvesterrakete in der Mitte des Bildschirms an
   * @param text Der Text oder die Zahl, die in der Mitte der Explosion angezeigt werden soll
   * @param color Die Farbe der Explosion (default, red, green, blue)
   * @param duration Dauer der Animation in Millisekunden (Standard: 1500ms)
   */
  showExplosion(text: string, color: 'default' | 'red' | 'green' | 'blue' = 'red', duration: number = 1500): void {
    // Entferne vorherige Explosion, falls vorhanden
    this.removeExplosion();

    // Container erstellen
    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'explosion-container');

    // Explosion-Element erstellen
    const explosion = this.renderer.createElement('div');
    this.renderer.addClass(explosion, 'explosion');

    // Farbklasse hinzufügen, wenn nicht default
    if (color !== 'default') {
      this.renderer.addClass(explosion, `explosion-${color}`);
    }

    // Text-Element erstellen
    const textElement = this.renderer.createElement('div');
    this.renderer.addClass(textElement, 'explosion-text');
    this.renderer.setProperty(textElement, 'textContent', text);

    // Hauptpartikel für die Explosion erstellen
    for (let i = 0; i < 40; i++) {
      const particle = this.renderer.createElement('div');
      this.renderer.addClass(particle, 'explosion-particle');
      this.renderer.appendChild(explosion, particle);
    }

    // Trails für den Raketeneffekt erstellen
    for (let i = 0; i < 20; i++) {
      const trail = this.renderer.createElement('div');
      this.renderer.addClass(trail, 'explosion-trail');
      this.renderer.appendChild(explosion, trail);
    }

    // Elemente zusammenfügen
    this.renderer.appendChild(explosion, textElement);
    this.renderer.appendChild(container, explosion);
    this.renderer.appendChild(document.body, container);

    // Soundeffekt abspielen (optional)
    this.playExplosionSound();

    // Referenz speichern
    this.explosionElement = container;

    // Nach der angegebenen Zeit entfernen
    setTimeout(() => {
      this.removeExplosion();
    }, duration);
  }

  private removeExplosion(): void {
    if (this.explosionElement && document.body.contains(this.explosionElement)) {
      this.renderer.removeChild(document.body, this.explosionElement);
      this.explosionElement = null;
    }
  }

  private playExplosionSound(): void {
    try {
      const audio = new Audio();
      audio.src = 'assets/sounds/firework-explosion.mp3'; // Du musst diese Datei in dein Assets-Verzeichnis legen
      audio.volume = 0.5;
      audio.play().catch(err => {
        console.log('Audio konnte nicht abgespielt werden:', err);
      });
    } catch (error) {
      console.log('Fehler beim Abspielen des Sounds:', error);
    }
  }

}
