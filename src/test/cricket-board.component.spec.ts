import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketBoardComponent } from '../app/modules/cricket-board/cricket-board/cricket-board.component';

describe('CricketComponentComponent', () => {
  let component: CricketBoardComponent;
  let fixture: ComponentFixture<CricketBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CricketBoardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
