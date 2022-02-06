import { Component, OnInit, Type } from '@angular/core';
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


  constructor(private dartCounterService: DartCounterService) {
    this.points$ = this.dartCounterService.points$;
    this.dartCount$ = this.dartCounterService.dartCount$;
    this.playerName$ = this.dartCounterService.playerName$;
    this.roundCount$ = this.dartCounterService.roundCount$;

  }


  ngOnInit(): void {
    // echt dirty, Tom mal fragen wie das besser geht, wahrscheinlich neue UI Componente ;-)
    var players = window.prompt('Hi lets play darts! Enter number of players:');
    this.initPlayers(players);
  }

  public initPlayers(players: string | null) {

    if (players == null || players === "") {
      this.dartCounterService.initPlayers(1);
    } else {
      this.dartCounterService.initPlayers(+players);
    }
  }

}
