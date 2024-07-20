import {Injectable} from '@angular/core';
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable} from 'rxjs';
import {GameType} from "../models/enum/GameType";

@Injectable({
  providedIn: 'root'
})
export class QueryParamValidationGuard  {

  constructor(private router: Router,
              private snackbar: MatSnackBar
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              _unused: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const playerCount = route.queryParamMap.getAll('playerNames').length
    const gameType = route.queryParamMap.get('gameType')

    if (this.isValidGameType(gameType) && this.isValidPlayerCount(playerCount)) {
      return true
    } else {
      /**
       * We have to manually redirect to root ('/'), otherwise we get a blank screen
       * For more info, please refer to https://github.com/angular/angular/issues/16211
       */
      this.router.navigate([])
      this.snackbar.open(`Sorry, something went wrong. Please try again.`, 'OK', {duration: 3000});
      return false
    }
  }

  private isValidGameType(gameType: string | null): boolean {
    return Object
      .values(GameType)
      .some(e => e == gameType)
  }

  // noinspection JSMethodCanBeStatic
  private isValidPlayerCount(playerCount: number): boolean {
    return playerCount > 0
  }
}
