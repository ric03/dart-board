import {Component, ViewChild} from '@angular/core';
import {MatRipple} from '@angular/material/core';
import {DartCounterService} from 'src/app/services/dart-counter.service';


@Component({
  selector: 'app-input-button-row',
  templateUrl: './input-button-row.component.html',
  styleUrls: ['./input-button-row.component.scss'],
})
export class InputButtonRowComponent {
  @ViewChild(MatRipple) ripple: MatRipple | undefined;
  arrayOf5 = Array(5);
  inputDiasbled: boolean = true;
  multiplicator: number = 1;
  dynamicColor: string = '';

  constructor(private dartCounterService: DartCounterService) {
  }

  onClick(value: number) {
    this.changeButtonColor(value);
    this.inputDiasbled = false;
  }

  onChange(value: number) {
    this.multiplicator = value;
    this.changeButtonColor(value);
    this.inputDiasbled = false;
  }

  private changeButtonColor(value: number) {
    if (value == 1) {
      this.dynamicColor = '#32b909';
      // this.dynamicColor='warn'; funktioniert wenn bei [ngStyle]="{'background-color' :
      // statt 'background-color' 'color genommen wird' das ist besimmt bei allen Componenten so
    }
    if (value == 2) {
      this.dynamicColor = '#673ab7';
    }
    if (value == 3) {
      this.dynamicColor = '#f44336';
    }
  }

  public reduceCountByPoints(points: number) {
    this.dartCounterService.reduceCountBy(points * this.multiplicator);

  }

  public reduceBull(points: number) {
    this.dartCounterService.reduceCountBy(points);
  }

  public reduceBullsEye(points: number) {
    this.dartCounterService.reduceCountBy(points);
  }

  public reduceDartCounter() {
    this.dartCounterService.reduceDartCount();
    this.inputDiasbled = true;
    this.dynamicColor = '';
  }

}
