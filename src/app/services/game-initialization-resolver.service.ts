import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { DartService } from "./dart.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class GameInitializationResolver implements Resolve<boolean> {

  constructor(private dartService: DartService, private snackbar: MatSnackBar,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let gameType: string = route.queryParamMap.get('gameType')!;
    const playerNames = route.queryParamMap.getAll('playerNames');
    if (playerNames.length > 0) {
      this.dartService.setGameType(gameType);
      this.dartService.initPlayers(playerNames);
      return of(true);
    }
    this.snackbar.open(`Sorry, please add at least 1 Player.`, 'OK', { duration: 3000 });
    return EMPTY;
  }
}
