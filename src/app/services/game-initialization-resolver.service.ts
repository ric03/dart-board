import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {GameType} from '../models/enum/GameType';
import {CricketService} from './cricket.service';
import {DartService} from "./dart.service";
import {CurrentPlayerService} from "./current-player.service";
import {RoundCountService} from "./round-count.service";

@Injectable({
  providedIn: 'root'
})
export class GameInitializationResolver {
  private roundCountService = inject(RoundCountService);

  constructor(private dartService: DartService,
              private cricketService: CricketService,
              private currentplayerService: CurrentPlayerService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, _unused: RouterStateSnapshot): Observable<boolean> {
    const gameType = <GameType>route.queryParamMap.get('gameType')!;
    const playerNames = route.queryParamMap.getAll('playerNames');
    const maxRounds = route.queryParamMap.get('maxRounds');

    if (gameType === GameType.Highscore && maxRounds) {
      this.roundCountService.setMaxRounds(Number(maxRounds));
    } else {
      this.roundCountService.setMaxRounds(45);
    }

    if (gameType === GameType.Cricket) {
      this.cricketService.setGameType(GameType.Cricket);
      this.dartService.playerNames = playerNames
      this.cricketService.initPlayers(playerNames);
    } else {
      this.dartService.setGameType(gameType);
      this.dartService.playerNames = playerNames
      this.dartService.initPlayers(playerNames);
    }
    this.currentplayerService.currentGameMode = gameType;
    return of(true);

  }
}
