import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

enum GameType {
  Simple501 = '501 simple',
  DoubleOut501 = '501 double out',
  Cricket = 'Cricket',
}

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss']
})
export class GameSelectionComponent {

  // Create a reference, to make the enum accessible in the html-template
  gameType = GameType;

  formGroup: FormGroup = this.fb.group({
    gameType: GameType.Simple501,
    playerNames: this.fb.array([
      this.fb.control('first'),
      this.fb.control('second'),
    ]),
  });

  private readonly defaultFormState = {
    gameType: GameType.Simple501,
    playerNames: ['first', 'second']
  }

  constructor(private fb: FormBuilder,
    private router: Router,
  ) {
  }

  get playerNames(): FormArray {
    return this.formGroup.get('playerNames') as FormArray;
  }

  addPlayerName() {
    if (this.playerNames.length < 8) {
      this.playerNames.push(this.fb.control(''));
    }

  }

  removePlayerName(index: number) {
    this.playerNames.removeAt(index);
  }

  onSubmit() {
    const playerNames = this.formGroup.value.playerNames
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['dartboard'], { queryParams: { playerNames } });
  }

  onReset(event: Event) {
    // The reset event fires when a <form> is reset.
    // Required to prevent the default reset mechanism.
    // Otherwise, the form would be completely empty.
    event.preventDefault();

    this.formGroup.reset(this.defaultFormState)
  }
}
