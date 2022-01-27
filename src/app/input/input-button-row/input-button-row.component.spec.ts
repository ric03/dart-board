import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputButtonRowComponent } from './input-button-row.component';

describe('InputButtonRowComponent', () => {
  let component: InputButtonRowComponent;
  let fixture: ComponentFixture<InputButtonRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputButtonRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputButtonRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
