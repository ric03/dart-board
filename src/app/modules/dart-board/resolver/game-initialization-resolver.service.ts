import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { DartService } from "../../../services/dart.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';

@Injectable({
  providedIn: 'root'
})
export class GameInitializationResolver implements Resolve<boolean> {

  constructor(private dartService: DartService, private snackbar: MatSnackBar,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const playerNames = route.queryParamMap.getAll('playerNames');
    if (playerNames.length > 0) {
      this.dartService.initPlayers(playerNames);
      return of(true);
    }
    this.snackbar.open(`Sorry, please add at least 1 Player.`, 'OK', { duration: 3000 });
    return EMPTY;
  }
}
