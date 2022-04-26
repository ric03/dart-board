import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {GameType} from '../models/enum/GameType';
import {CricketService} from './cricket.service';
import {DartService} from "./dart.service";

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
    this.snackbar.open(`Sorry, please add at least 1 Player.`, 'OK', {duration: 3000});
    return EMPTY;
  }
}
