import {TestBed} from '@angular/core/testing';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CurrentPlayerService} from "../app/services/current-player.service";
import {DartService} from "../app/services/dart.service";
import {PlayerService} from "../app/services/player.service";
import {RoundCountService} from "../app/services/round-count.service";

describe('DartService', () => {
  let service: DartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PlayerService, useValue: null},
        {provide: CurrentPlayerService, useValue: null},
        {provide: MatDialog, useValue: null},
        {provide: MatSnackBar, useValue: null},
        {provide: RoundCountService, useValue: null},
      ]
    });
    service = TestBed.inject(DartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
