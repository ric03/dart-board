import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { DartService } from "./dart.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CricketService } from './cricket.service';
import { GameType } from '../modals/enum/GameType';

@Injectable({
  providedIn: 'root'
})
export class GameInitializationResolver implements Resolve<boolean> {

  constructor(private dartService: DartService, private cricketService: CricketService, private snackbar: MatSnackBar,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let gameType: string = route.queryParamMap.get('gameType')!;
    const playerNames = route.queryParamMap.getAll('playerNames');
    if (playerNames.length > 0) {
      if (gameType == GameType.Cricket) {
        this.cricketService.setGameType(gameType);
        this.cricketService.initPlayers(playerNames);
      } else {
        this.dartService.setGameType(gameType);
        this.dartService.initPlayers(playerNames);
      }
      return of(true);
    }
    this.snackbar.open(`Sorry, please add at least 1 Player.`, 'OK', { duration: 3000 });
    return EMPTY;
  }
}
