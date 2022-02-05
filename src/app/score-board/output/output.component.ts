import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DartCounterService } from 'src/app/services/dart-counter.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  public points$: Subject<number>;
  public dartCount$: Subject<number>;
  public playerName$: Subject<string>;
  public roundCount$: Subject<number>;
  arrayOfPlayersOutout =  Array(5);

  constructor(private dartCounterService: DartCounterService) { 
    this.points$ = this.dartCounterService.points$;
    this.dartCount$ = this.dartCounterService.dartCount$;
    this.playerName$ = this.dartCounterService.playerName$;
    this.roundCount$ = this.dartCounterService.roundCount$;
  }

  ngOnInit(): void { }

}
