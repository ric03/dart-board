import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DartService} from "../../../services/dart.service";

@Injectable({
  providedIn: 'root'
})
export class GameInitializationResolver implements Resolve<boolean> {

  constructor(private dartService: DartService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const playerNames = route.queryParamMap.getAll('playerNames');
    this.dartService.initPlayers(playerNames);

    return of(true);
  }
}
