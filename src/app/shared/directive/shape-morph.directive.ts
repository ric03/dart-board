import {Directive, ElementRef, EventEmitter, HostListener, inject, Output, Renderer2} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {ShapeMorphHoldSnackComponent} from './shape-morph-hold-snack.component';
import {DrunkToggleService} from "../../services/drunk-toggle.service";

@Directive({
  selector: '[appShapeMorph]',
  standalone: true
})
export class ShapeMorphDirective {
  rippleColor: string = "orange"; // Default Ripple Farbe
  private originalBackgroundColor: string;
  private originalBorder: string;

  // Long-press handling
  private pressTimer: any = null;
  private pressStartTime: number = 0;
  private holdDuration = 1000; // ms
  private clickCount = 0;
  private clickResetTimer: any = null;
  private suppressNextNativeClick = false;
  private holdSucceeded = false;
  private awaitingRelease = false;
  private defaultHoldDuration = this.holdDuration;

  @Output() shapeMorphClick = new EventEmitter<void>();

  private readonly drunkToggleService = inject(DrunkToggleService)

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private snackBar: MatSnackBar
  ) {
    // Speichere die ursprüngliche Hintergrundfarbe
    this.originalBackgroundColor = window.getComputedStyle(this.el.nativeElement).backgroundColor;
    this.originalBorder = window.getComputedStyle(this.el.nativeElement).borderRadius;

    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.5s ease-in-out');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', this.originalBorder);
    const pos = window.getComputedStyle(this.el.nativeElement).position;
    if (!pos || pos === 'static') {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    }
    // Keep host border radius; avoid overflow hidden to prevent clipping badges
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', this.originalBorder);
    this.drunkToggleService.isDrunkModeOn.subscribe(value => {
      console.info("Drunkmode:", value)
      if (value) {
        this.holdDuration = 1000;
        this.renderer.listen(this.el.nativeElement, 'touchstart', (e: TouchEvent) => {
          // Unterdrückt z. B. Selektion/Callout in manchen Browsern
          e.preventDefault();
        })
      } else {
        this.holdDuration = 0;
      }
      this.defaultHoldDuration = this.holdDuration;
    })
  }


  /**
   * Führt bei einem Klick eine kurze Geräte-Vibration aus (sofern vom Browser/Endgerät unterstützt).
   *
   * Funktionsweise:
   * - Prüft zunächst, ob die Vibration API (Navigator.vibrate) verfügbar ist.
   * - Wenn ja, wird eine einfache Vibration von 200 Millisekunden ausgelöst.
   * - Wenn nein, wird eine Hinweis-Nachricht in der Konsole ausgegeben.
   *
   * Hinweise:
   * - Die Vibration API wird primär auf mobilen Endgeräten unterstützt.
   * - Auf Desktop-Browsern ist sie häufig nicht verfügbar oder deaktiviert.
   */
  vibrateOnClick(vibrateDuration: number): void {
    // Prüfe, ob die Vibration API im Browser verfügbar ist
    if ('vibrate' in navigator) {
      // Löse eine einfache Vibration von 200 Millisekunden aus
      navigator.vibrate(vibrateDuration);
    } else {
      console.log('Vibration API wird in diesem Browser nicht unterstützt.');
    }
  }

  private startProgressFill() {
    // Start visual feedback: morph the button during holdDuration and show top snackbar with progress
    this.openTopProgressSnack();
  }

  private resetProgressFill() {
    this.closeTopProgressSnack();
  }

  // Snack handling for hold progress
  private holdSnackRef: MatSnackBarRef<ShapeMorphHoldSnackComponent> | null = null;

  private openTopProgressSnack() {
    if (this.holdDuration > 0) {
      if (this.holdSnackRef) return;
      this.holdSnackRef = this.snackBar.openFromComponent(ShapeMorphHoldSnackComponent, {
        duration: this.holdDuration,
        panelClass: ['app-shape-morph-snack'],
        data: {duration: this.holdDuration},
        verticalPosition: "top",
        horizontalPosition: "center"
      });
      // When snack closes (progress reaches 100 or canceled), clear ref
      this.holdSnackRef.afterDismissed().subscribe(() => {
        if (this.holdSnackRef?.instance.progress == 100) {
          this.perfromButtonShapeMorph();
          this.vibrateOnClick(400)
        }
        this.holdSnackRef = null;
        this.holdDuration = this.defaultHoldDuration;
      });
    } else {
      this.perfromButtonShapeMorph();
      this.vibrateOnClick(400)
    }
  }

  private closeTopProgressSnack() {
    if (this.holdSnackRef) {
      this.holdSnackRef.dismiss();
      this.holdSnackRef = null;
    }
  }

  private openHintIfNeeded() {
    // no change
    this.clickCount++;
    if (this.clickResetTimer) {
      clearTimeout(this.clickResetTimer);
    }
    // Reset nach 2 Sekunden ohne weiteren Klick
    this.clickResetTimer = setTimeout(() => {
      this.clickCount = 0;
    }, 2000);

    if (this.clickCount >= 4) {
      this.clickCount = 0;
      this.snackBar.open(`Bitte gedrückt halten, um auszulösen.`, 'OK', {
        duration: 3000,
        panelClass: ['app-shape-morph-snack']
      });
    }
  }

  // Globally prevent the native context menu (long-press menu on mobile/tablets)
  @HostListener('contextmenu', ['$event'])
  onGlobalContextMenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Desktop: Maus gedrückt
  @HostListener('mousedown', ['$event'])
  onMouseDown(ev: MouseEvent) {
    if (ev.button !== 0) return; // nur linker Button
    this.beginPress();
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.endPress(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.endPress(false);
  }

  // Touch: Finger runter / hoch
  @HostListener('touchstart', ['$event'])
  onTouchStart(ev: TouchEvent) {
    this.beginPress();
  }

  @HostListener('touchend')
  onTouchEnd() {
    this.endPress(true);
  }

  @HostListener('touchcancel')
  onTouchCancel() {
    this.endPress(false);
  }

  // Interzeptiere normalen Click und zeige Hinweis-Logik
  @HostListener('click', ['$event'])
  onClick(ev: any) {
    if (this.isMissBtn(ev.target as HTMLButtonElement)) {
      this.holdDuration === 0 ? this.holdDuration = 0 : this.holdDuration = 300
    }
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if (this.holdDuration > 0) {
      this.openHintIfNeeded();
    }
  }

  private isMissBtn(btnElement: HTMLButtonElement) {
    const btnBadgeContent = btnElement.getAttribute("ng-reflect-content") ?? ''
    const btnContent = btnElement.innerText.replace(btnBadgeContent, '')
    const isNumber = btnContent.match(/\d/g) ? btnContent.match(/\d/g)!.length > 0 : false
    return !isNumber && btnContent !== 'BullsEye' && btnContent !== 'Bull';
  }

  private beginPress() {
    // any running
    if (this.pressTimer) return;
    this.vibrateOnClick(200);
    this.pressStartTime = Date.now();
    this.startProgressFill();
    this.awaitingRelease = true;
    this.holdSucceeded = false;

    this.pressTimer = setTimeout(() => {
      // Haltezeit erreicht: trigger morph completion hook here if needed
      this.holdSucceeded = true;
      this.vibrateOnClick(200);
    }, this.holdDuration);
  }

  private endPress(success: boolean) {
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
      this.pressTimer = null;
    }
    this.resetProgressFill();


    // true bei mouseup/touchend
    if (success && this.holdSucceeded) {
      // Aktion erst beim Loslassen ausführen
      this.shapeMorphClick.emit();
      this.suppressNextNativeClick = true;
      setTimeout(() => {
        const event = new MouseEvent('click', {bubbles: true, cancelable: true});
        (event as any).syntheticLongPress = true;
        this.el.nativeElement.dispatchEvent(event);
      }, 0);
      this.vibrateOnClick(400)
      this.clickCount = 0
    }

    // Reset States
    this.holdSucceeded = false;
    this.awaitingRelease = false;
  }

  private perfromButtonShapeMorph() {
    // Use holdDuration for transition timing
    this.renderer.setStyle(this.el.nativeElement, 'transition', `border-radius 500ms linear, background-color 700ms linear`);
    // perform animation over holdDuration, not instant
    // Zuerst zum Quadrat ändern
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '20%');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.rippleColor);

    // Nach holdDuration wieder zurück
    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, 'border-radius', this.originalBorder);
      this.renderer.setStyle(this.el.nativeElement, 'background-color', this.originalBackgroundColor);
    }, 700);
  }
}
