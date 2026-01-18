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
export function isValidPlayerCount(playerCount: number, gameType: string | null): boolean {
    if (gameType === GameType.Elimination301) {
        return playerCount >= 2;
    }
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

    if (isValidGameType(gameType) && isValidPlayerCount(playerCount, gameType)) {
        return true
    } else {
        let msg = "Sorry, something went wrong. Please try again."
        if (playerCount < 2 && (gameType == GameType.Elimination301)) {
            msg = 'Please try again, u need at least 2 players'
        }

        /**
         * We have to manually redirect to root ('/'), otherwise we get a blank screen
         * For more info, please refer to https://github.com/angular/angular/issues/16211
         */
        router.navigate([])
        snackbar.open(msg, 'OK', {duration: 3000, verticalPosition: 'top', panelClass: ['app-shape-morph-snack'],});
        return false
    }
}


