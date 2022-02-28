import { Component, OnInit, Type } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import { DartCounterService } from 'src/app/services/dart-counter.service';
import { NumberInput } from '@angular/cdk/coercion';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  public points$: Subject<number>;
  public dartCount$: BehaviorSubject<number> = new BehaviorSubject(3);
  public playerName$: Subject<string>;
  public roundCount$: BehaviorSubject<number> = new BehaviorSubject(1);

  color: ThemePalette = 'primary';
  color2: ThemePalette = 'warn';
  mode: ProgressBarMode = 'determinate';
  valueDartCount: number = 3;
  valueRoundCount: number = 1;

  constructor(private dartCounterService: DartCounterService, private snackBar: MatSnackBar) {
    this.points$ = this.dartCounterService.points$;
    this.dartCount$ = this.dartCounterService.dartCount$;
    this.playerName$ = this.dartCounterService.playerName$;
    this.roundCount$ = this.dartCounterService.roundCount$;

  }

  getRoundCount(): NumberInput {
    this.valueRoundCount = this.roundCount$.value * 100 / 45;
    return this.valueRoundCount;
  }

  getDartCount(): NumberInput {
    this.valueDartCount = this.dartCount$.value * 100 / 3;
    return this.valueDartCount;
  }

  ngOnInit(): void {
  }
}
