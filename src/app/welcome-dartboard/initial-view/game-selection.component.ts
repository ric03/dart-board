import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {DartCounterService} from 'src/app/services/dart-counter.service';

enum GameType {
  Simple501 = '501 simple',
  DoubleOut501 = '501 double out',
  Cricket = 'Cricket',
}

const MAX_PLAYER_COUNT = 6;

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss']
})
export class GameSelectionComponent {

  private defaultFormState = {
    gameType: GameType.Simple501,
    playerCount: 2
  }
  formGroup: FormGroup = this.fb.group(this.defaultFormState);

  // Create a reference, to make the enum accessible in the html-template
  gameType = GameType;
  maxPlayerCount = new Array(MAX_PLAYER_COUNT);

  constructor(private fb: FormBuilder,
              private router: Router,
              private dartCounterService: DartCounterService,
  ) {
  }

  onSubmit() {
    // TODO move this invocation into the init function of the target (pass playerCount by query string)
    this.dartCounterService.initPlayers(this.formGroup.value.playerCount);

    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['dartboard'], {queryParams: {playerCount: 2}});
  }

  onReset() {
    this.formGroup.reset(this.defaultFormState)
  }
}
