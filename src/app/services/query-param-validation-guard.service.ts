import {GameType} from "../models/enum/GameType";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

export function isValidGameType(gameType: string | null): boolean {
  return Object
    .values(GameType)
    .some(e => e == gameType)
}

// noinspection JSMethodCanBeStatic
export function isValidPlayerCount(playerCount: number): boolean {
  return playerCount > 0
}


export const queryParamValidationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const playerCount = route.queryParamMap.getAll('playerNames').length
  const gameType = route.queryParamMap.get('gameType')
  const router = inject(Router)
  const snackbar = inject(MatSnackBar)

  if (isValidGameType(gameType) && isValidPlayerCount(playerCount)) {
    return true
  } else {
    /**
     * We have to manually redirect to root ('/'), otherwise we get a blank screen
     * For more info, please refer to https://github.com/angular/angular/issues/16211
     */
    router.navigate([])
    snackbar.open(`Sorry, something went wrong. Please try again.`, 'OK', {duration: 3000});
    return false
  }
}


