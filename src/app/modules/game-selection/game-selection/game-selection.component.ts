import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, UntypedFormArray} from '@angular/forms';
import {Router} from "@angular/router";
import {GameType} from '../../../models/enum/GameType';

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
})
export class GameSelectionComponent implements OnInit {

  // Create a reference, to make the enum accessible in the html-template
  gameType = GameType;

  formGroup: FormGroup<{
    gameType: FormControl<any>,
    playerNames: FormArray<FormControl<any>>
  }> = this.fb.group({
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

  ngOnInit(): void {
    if (localStorage.getItem('playerNames')) {
      this.formGroup.controls.playerNames = this.fb.array(JSON.parse(localStorage.getItem('playerNames')!));
    }
  }

  get playerNames(): UntypedFormArray {
    return this.formGroup.get('playerNames') as UntypedFormArray;
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
    const playerNames = this.formGroup.controls.playerNames.value;
    const gameType = this.formGroup.value.gameType;

    if (gameType == GameType.Simple501 || gameType == GameType.DoubleOut501) {
      this.router.navigate(['dartboard'], {queryParams: {gameType, playerNames}});
    } else {
      this.router.navigate(['cricketboard'], {queryParams: {gameType, playerNames}});
    }
    localStorage.setItem('playerNames', JSON.stringify(playerNames));
  }

  onReset(event: Event) {
    // The reset event fires when a <form> is reset.
    // Required to prevent the default reset mechanism.
    // Otherwise, the form would be completely empty.
    event.preventDefault();

    this.formGroup.reset(this.defaultFormState)
  }
}
