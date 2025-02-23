import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {InputButton} from "../modules/dart-board/components/input-button-row/input-button-row.component";

@Injectable({
  providedIn: 'root'
})
export class BadgeHandleService {

  private badgeCount = new BehaviorSubject<number>(1);
  private badgeVisibility = new BehaviorSubject<boolean>(true);
  tempBadgeValue: number = 1
  matBadgeHiddenBull: boolean = true;
  matBadgeHiddenBullsEye: boolean = true;
  bullBadgeCount: string | number | undefined | null;
  bullsEyeBadgeCount: string | number | undefined | null;
  matBadgeHiddenMiss: boolean = true;
  missBadgeCount: string | number | undefined | null;
  twentyButtons: InputButton[] = [];

  resetBadges() {
    this.badgeCount.next(1);
    this.badgeVisibility.next(true);
    this.tempBadgeValue = 1;
    this.matBadgeHiddenBull = true;
    this.matBadgeHiddenBullsEye = true;
    this.matBadgeHiddenMiss = true;
    this.twentyButtons.forEach(input => {
      input.badge = true;
      input.badgeValue = undefined;
    });
  }

  incrementBadgeCount() {
    this.badgeCount.next(this.badgeCount.value + 1);
  }

  getBadgeCount() {
    return this.badgeCount.asObservable();
  }

  getBadgeVisibility() {
    return this.badgeVisibility.asObservable();
  }
}
