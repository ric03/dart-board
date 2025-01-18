import {Component, inject, OnDestroy} from '@angular/core';
import {DartService} from "../../../services/dart.service";

@Component({
  selector: 'app-dart-board',
  templateUrl: './dart-board.component.html',
})
export class DartBoardComponent implements OnDestroy {
  dartservice = inject(DartService);

  ngOnDestroy(): void {
    this.dartservice._gameType = '';
  }
}
