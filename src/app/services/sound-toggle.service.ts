import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SoundToggleService {
  // default active
  isSoundOn = new BehaviorSubject<boolean>(true);
}
