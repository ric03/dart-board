import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import { Player } from './player.model';


@Injectable({
  providedIn: 'root'
})
export class DartCounterService {

  private first: Player = { id: 1, playerName: 'Player 1', points: 501, dartCount: 3 };
  private roundCount = 1;
  public points$: BehaviorSubject<number> = new BehaviorSubject(501);
  public dartCount$: BehaviorSubject<number> = new BehaviorSubject(3);
  public playerName$: BehaviorSubject<string> = new BehaviorSubject('Player 1');
  public roundCount$: BehaviorSubject<number> = new BehaviorSubject(1);
  private playerArr: Player[] = [];
  public playerArr$$: BehaviorSubject<Player[]> = new BehaviorSubject([this.first]);
  private tempPlayerPoints: number = 0;
  
  // `this.` is always required to access class members and functions
  private currentPlayer= this.first;

  //TODO: ÜberschussLogik  , private snackBar: MatSnackBar

  initPlayers(player: number) {
    this.playerArr = [];
    for (let i = 1; i <= player; i++) {
      const player: Player = {
        id: i,
        playerName: 'Player ' + i,
        points: 501,
        dartCount: 3
      }
      this.playerArr.push(player);
    }
    this.currentPlayer = this.playerArr[0];
    this.playerArr$$.next(this.playerArr);
  }

  reduceCountBy(points: number) {
    this.resetPlayerName();
    if(this.currentPlayer.dartCount > 1){
      this.tempPlayerPoints = this.currentPlayer.points;
    }
    if (this.currentPlayer.dartCount > 0) {
      this.currentPlayer.points -= points;
    }
    this.reduceDartCount();
    this.points$.next(this.currentPlayer.points);
  }

  reduceCountByBull() {
    this.currentPlayer.points -= 25;
  }

  reduceCountByBullsEye() {
    this.currentPlayer.points -= 50;
  }

  reduceDartCount() {    
    if ((this.currentPlayer.dartCount - 1) >= 0) {
      this.currentPlayer.dartCount -= 1;
      this.overshotCheck();
      this.winCheck();
    }
    if (this.currentPlayer.dartCount == 0) {
      this.changePlayer(this.currentPlayer.id);
      
    }
    this.playerName$.next(this.currentPlayer.playerName);
    this.dartCount$.next(this.currentPlayer.dartCount);
    return this.currentPlayer.dartCount;
  }

  changePlayer(id: number) {
    this.playerArr.forEach(player => {
      if (this.playerArr.length == id) {
        this.currentPlayer = this.playerArr[0];
        this.currentPlayer.playerName = this.playerArr[0].playerName;
      }
      if (player.id == id + 1) {
        this.currentPlayer = player;
        this.currentPlayer.playerName = player.playerName;
      }
    });
    if (this.currentPlayer.id == this.playerArr[0].id) {
      this.roundCount$.next(this.roundCount += 1);
    }
    this.currentPlayer.dartCount = 3;
  }

  winCheck() {
    if (this.currentPlayer.points == 0 && this.currentPlayer.dartCount >= 0) {
      this.currentPlayer.playerName = this.currentPlayer.playerName + ' hat Gewonnen ;-)';
      this.playerName$.next(this.currentPlayer.playerName);
      
    }
  }
  public overshotCheck():boolean {
    // dartcounter begins at 3 
    if (this.currentPlayer.points < 0) {
      this.currentPlayer.points = this.tempPlayerPoints;
      this.currentPlayer.dartCount = 0;

        this.currentPlayer.playerName = this.currentPlayer.playerName + ' hat Überschossen :-(';
        this.playerName$.next(this.currentPlayer.playerName);
    //boolen überschossen
    return true;
    }   
    return false;
   
  }

  resetPlayerName() {
      this.playerArr[this.playerArr.indexOf(this.currentPlayer)].playerName = "Player " + (this.playerArr.indexOf(this.currentPlayer)+1);
      this.playerName$.next(this.currentPlayer.playerName);
      this.playerArr$$.next(this.playerArr);
    }
  
}
