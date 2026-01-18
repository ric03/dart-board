import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DartService} from "../../../services/dart.service";
import {ToggleFullscreenService} from "../../../services/toggle-fullscreen.service";

@Component({
  selector: 'app-dart-board',
  templateUrl: './dart-board.component.html',
  standalone: false,
})
export class DartBoardComponent implements OnDestroy, OnInit {

  dartservice = inject(DartService);
  protected readonly fullscreenService = inject(ToggleFullscreenService);

  ngOnInit(): void {
    this.fullscreenService.toggleTabFullScreenModeGame()
  }


  ngOnDestroy(): void {
    this.dartservice._gameType = '';
  }

}
