import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DrunkToggleService {

  isDrunkModeOn = new BehaviorSubject(false)
}
