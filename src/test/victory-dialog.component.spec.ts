import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VictoryDialog} from '../app/modals/victory-dialog/victory-dialog.component';

describe('VictoryDialog', () => {
  let component: VictoryDialog;
  let fixture: ComponentFixture<VictoryDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VictoryDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VictoryDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
