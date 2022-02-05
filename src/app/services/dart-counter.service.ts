import { Injectable } from '@angular/core';
import { first, Subject } from 'rxjs';

interface Player {
  id: number;
  dartCount: number;
  playerName: string,
  points: number,
}

@Injectable({
  providedIn: 'root'
})
export class DartCounterService {

  private first: Player = {id:1, playerName: 'Player 1', points:501, dartCount:3};
  private roundCount = 1;

  public points$: Subject<number> = new Subject();
  public dartCount$: Subject<number> = new Subject();
  public playerName$: Subject<string> = new Subject();
  public roundCount$: Subject<number> = new Subject();
  public playerArr: Array<Player> = new Array();
  // `this.` is always required to access class members and functions
  private currentPlayer = this.first;
  private initRound: number = 1;
  private initPoints: number = 501;
  private initPlayerName: string = 'Player 1';

  initPlayers(player: number){
    this.playerArr = new Array(player);
    for (let i  = 1 ; i <= player ; i++){
      this.playerArr[i-1]= {id:i, playerName: 'Player '+ i, points:501, dartCount:3};
    }    
    this.currentPlayer = this.playerArr[0];
  }

  reduceCountBy(points: number) {
    if( (this.currentPlayer.points - points) >= 0 && this.currentPlayer.dartCount > 0){
      this.currentPlayer.points -= points;
      this.reduceDartCount();
    }
    if( (this.currentPlayer.points - points) < 0 ){
      this.currentPlayer.points;  
    }  
    this.points$.next(this.currentPlayer.points);
  }
  reduceCountByBull(){
    this.currentPlayer.points -= 25;
  }
  reduceCountByBullSEye(){
    this.currentPlayer.points -= 50;
  }
  reduceDartCount() {
    if( (this.currentPlayer.dartCount - 1) >= 0 ){
      this.currentPlayer.dartCount -= 1;
      this.winCheck();
    }  
    if( this.currentPlayer.dartCount == 0){
      this.changePlayer(this.currentPlayer.id);
      this.currentPlayer.dartCount = 3;
    }
    this.playerName$.next(this.currentPlayer.playerName);
    this.dartCount$.next(this.currentPlayer.dartCount);
  }

  changePlayer(id:number) {
    this.playerArr.forEach(player => {
      if(player.id == id+1){
        this.currentPlayer = player;
        this.currentPlayer.playerName = player.playerName;
      }
    });
    this.roundCount$.next(this.roundCount+=1);
  }
  winCheck(){
    if(this.currentPlayer.points == 0 && this.currentPlayer.dartCount >= 0){
      this.currentPlayer.playerName=this.currentPlayer.playerName+' hat Gewonnen ;-)'; 
      this.playerName$.next(this.currentPlayer.playerName);
    }
  }
}
