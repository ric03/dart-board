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
  private second: Player = {id:2, playerName: 'Player 2', points:501, dartCount:3};

  public points$: Subject<number> = new Subject();
  public dartCount$: Subject<number> = new Subject();
  public playerName$: Subject<string> = new Subject();

  // `this.` is always required to access class members and functions
  private currentPlayer: Player = this.first;

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
    if(id == 1){
      this.currentPlayer = this.second;
      this.currentPlayer.playerName = this.second.playerName;
    }
    if(id == 2){
      this.currentPlayer = this.first;
      this.currentPlayer.playerName = this.first.playerName;
    }
  }
  winCheck(){
    if(this.currentPlayer.points == 0 && this.currentPlayer.dartCount >= 0){
      this.currentPlayer.playerName=this.currentPlayer.playerName+' hat Gewonnen ;-)'; 
      this.playerName$.next(this.currentPlayer.playerName);
    }
  }
}
