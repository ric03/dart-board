import {ChangeDetectorRef, Component, effect, HostListener, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {MultiplierService} from '../../../services/multiplier.service';

@Component({
  selector: 'app-multiplier-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, ReactiveFormsModule],
  templateUrl: './multiplier-toggle.component.html',
  styleUrls: ['./multiplier-toggle.component.scss']
})
export class MultiplierToggleComponent implements OnInit {
  public multiplierService = inject(MultiplierService);
  private cdr = inject(ChangeDetectorRef);
  public screenOrientation: OrientationType = 'portrait-primary' as OrientationType;

  multiplierControl: UntypedFormControl = new UntypedFormControl('1');

  constructor() {
    effect(() => {
      this.multiplierControl.setValue(String(this.multiplierService.multiplier()), {emitEvent: false});
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.updateOrientation();
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.updateOrientation();
    this.multiplierControl.valueChanges.subscribe(value => {
      this.multiplierService.setMultiplier(Number(value));
    });
  }

  private updateOrientation() {
    this.screenOrientation = (window.innerHeight > window.innerWidth ? 'portrait-primary' : 'landscape-primary') as OrientationType;
  }
}
