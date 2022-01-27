import { Injectable } from '@angular/core';
import { first, Subject } from 'rxjs';

interface Player {
  name: string,
  points: number,
}

@Injectable({
  providedIn: 'root'
})
export class DartCounterService {

  private first: Player = {name: 'Peter', points:501}
  private second: Player = {name: 'Tom', points:501}

  public points$: Subject<number> = new Subject();

  // `this.` is always required to access class members and functions
  private currentPlayer: Player = this.first;

  reduceCountBy(points: number) {
    this.currentPlayer.points -= points;
    this.points$.next(this.currentPlayer.points);
  }

  getCountPlayerOne() {
    return this.first.points;
  }

}
