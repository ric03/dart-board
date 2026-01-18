import {Component, inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, UntypedFormArray} from '@angular/forms';
import {Router} from "@angular/router";
import {GameType} from '../../../models/enum/GameType';

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  standalone: false,
})
export class GameSelectionComponent implements OnInit, OnChanges {


  // Create a reference, to make the enum accessible in the html-template
  gameType = GameType;

  private fb = inject(FormBuilder)
  private router = inject(Router);

  formGroup = this.fb.group({
    gameType: new FormControl<any>(GameType.Simple501),
    playerNames: this.fb.array([
      this.fb.control('first'),
      this.fb.control('second'),
    ]),
    maxRounds: new FormControl<number>(15)
  });

  roundOptions = Array.from({length: 15}, (_, i) => (i + 1) * 3); // 3, 6, 9...45

  private readonly defaultFormState = {
    gameType: GameType.Simple501,
    playerNames: ['first', 'second'],
    maxRounds: 15
  }

  ngOnInit(): void {
    if (localStorage.getItem('playerNames')) {
      const savedNames = JSON.parse(localStorage.getItem('playerNames')!);
      this.formGroup.setControl('playerNames', this.fb.array(savedNames.map((name: string) => this.fb.control(name))));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.validateGameStart(this.playerNames)
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
    const maxRounds = this.formGroup.value.maxRounds;

    const queryParams = {gameType, playerNames, maxRounds};
    if (gameType == GameType.Cricket) {
      this.router.navigate(['cricketboard'], {queryParams});
    } else {
      this.router.navigate(['dartboard'], {queryParams});
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

  validateGameStart(playerNames: UntypedFormArray): boolean {
    const isMoreThenOnePlayer = playerNames.controls.length > 0
    const allPlayersHaveNames = !((playerNames.value as Array<any>).some((val: string | null) => val === '' || val === null))
    return isMoreThenOnePlayer && allPlayersHaveNames;
  }
}
