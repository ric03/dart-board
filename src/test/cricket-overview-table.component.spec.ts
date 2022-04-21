import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketOverviewTableComponent } from '../app/modules/cricket-board/components/cricket-overview-table/cricket-overview-table.component';

describe('CricketOverviewTableComponent', () => {
  let component: CricketOverviewTableComponent;
  let fixture: ComponentFixture<CricketOverviewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CricketOverviewTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketOverviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
