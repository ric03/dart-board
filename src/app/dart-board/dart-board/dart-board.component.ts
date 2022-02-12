import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DartCounterService } from 'src/app/services/dart-counter.service';

@Component({
  selector: 'app-dart-board',
  templateUrl: './dart-board.component.html',
  styleUrls: ['./dart-board.component.scss',
]
})
export class DartBoardComponent implements OnInit {

  constructor(private dartCounterService: DartCounterService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // echt dirty, Tom mal fragen wie das besser geht, wahrscheinlich neue UI Componente ;-)
   // var players = window.prompt('Hi lets play darts! Enter number of players:');
    //this.initPlayers(players);

  }
  ngOnDestroy():void{
  let answer =  window.prompt('Sicher das du neuladen willst, alle werte gehen verloren! Sicher?: ');
  }
  
  public initPlayers(players: string | null) {

    if (players == null || players === "") {
      this.dartCounterService.initPlayers(1);
    } else if( parseInt(players) <= 6) {
      this.dartCounterService.initPlayers(+players);
    }
  }

}
