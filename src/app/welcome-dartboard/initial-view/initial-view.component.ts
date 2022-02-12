import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { DartCounterService } from 'src/app/services/dart-counter.service';



interface Game {
  value: number;
  viewValue: string;
}

interface Players {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.scss']
})
export class InitialViewComponent implements OnInit {
  formGame: FormGroup;
  formPlayer: FormGroup;

  games: Game[] = [
    {value: 1, viewValue: '501'},
    {value: 2, viewValue: '501-Double-Out'},
    {value: 3, viewValue: 'Cricket'},
  ];

  players: Players[] = [
    {value: 1, viewValue: '1 Player'},
    {value: 2, viewValue: '2 Players'},
    {value: 3, viewValue: '3 Players'},
    {value: 4, viewValue: '4 Players'},
    {value: 5, viewValue: '5 Players'},
    {value: 6, viewValue: '6 Players'},
  ];

  userInputGame = new FormControl(this.games[1].value);
  userInputPlayer = new FormControl(this.players[1].value);


  constructor(private dartCounterService: DartCounterService) { 
    this.formGame = new FormGroup({game: this.userInputGame,});
    this.formPlayer = new FormGroup({player: this.userInputPlayer,});
  }

  ngOnInit(): void {
  }

  submitGameAndPlayersCount(){
    this.dartCounterService.initPlayers(this.userInputPlayer.value)
    //Test
    //console.log("submitted --> input Players" + this.userInputPlayer.value)
    //for routingOption later
    //console.log("submitted --> input Game" + this.userInputGame.value);
    

  }
}
