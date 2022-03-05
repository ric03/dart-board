import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";

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

  private readonly defaultFormState = {
    gameType: GameType.Simple501,
    playerCount: 2
  }
  formGroup: FormGroup = this.fb.group(this.defaultFormState);

  // Create a reference, to make the enum accessible in the html-template
  gameType = GameType;
  maxPlayerCount = [...Array(MAX_PLAYER_COUNT)].map((_, index) => index + 1);

  constructor(private fb: FormBuilder,
              private router: Router,
  ) {
  }

  onSubmit() {
    const playerNames = [...Array(this.formGroup.value.playerCount)].map((_, index) => `Player ${index}`)
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['dartboard'], {queryParams: {playerNames}});
  }

  onReset() {
    this.formGroup.reset(this.defaultFormState)
  }
}
