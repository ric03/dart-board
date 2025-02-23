import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {GameType} from '../models/enum/GameType';
import {CricketService} from './cricket.service';
import {DartService} from "./dart.service";
import {CurrentPlayerService} from "./current-player.service";

@Injectable({
  providedIn: 'root'
})
export class GameInitializationResolver {

  constructor(private dartService: DartService,
              private cricketService: CricketService,
              private currentplayerService: CurrentPlayerService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, _unused: RouterStateSnapshot): Observable<boolean> {
    const gameType = <GameType>route.queryParamMap.get('gameType')!;
    const playerNames = route.queryParamMap.getAll('playerNames');

    if (gameType === GameType.Cricket) {
      this.cricketService.setGameType(GameType.Cricket);
      this.cricketService.initPlayers(playerNames);
    } else {
      this.dartService.setGameType(gameType);
      this.dartService.initPlayers(playerNames);
    }
    this.currentplayerService.currentGameMode = gameType;
    return of(true);

  }
}
