import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, Subject} from 'rxjs';
import {DartCounterService} from 'src/app/services/dart-counter.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent {

  public points$: Subject<number>;
  public dartCount$: BehaviorSubject<number> = new BehaviorSubject(3);
  public playerName$: Subject<string>;
  public roundCount$: BehaviorSubject<number> = new BehaviorSubject(1);

  valueDartCount: number = 3;
  valueRoundCount: number = 1;

  constructor(private dartCounterService: DartCounterService, private snackBar: MatSnackBar) {
    this.points$ = this.dartCounterService.points$;
    this.dartCount$ = this.dartCounterService.dartCount$;
    this.playerName$ = this.dartCounterService.playerName$;
    this.roundCount$ = this.dartCounterService.roundCount$;

  }

  getRoundCount(): number {
    this.valueRoundCount = this.roundCount$.value * 100 / 45;
    return this.valueRoundCount;
  }

  getDartCount(): number {
    this.valueDartCount = this.dartCount$.value * 100 / 3;
    return this.valueDartCount;
  }
}
