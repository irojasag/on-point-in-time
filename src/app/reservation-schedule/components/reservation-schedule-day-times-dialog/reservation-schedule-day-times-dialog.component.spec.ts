import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationScheduleDayTimesDialogComponent } from './reservation-schedule-day-times-dialog.component';

describe('ReservationScheduleDayTimesDialogComponent', () => {
  let component: ReservationScheduleDayTimesDialogComponent;
  let fixture: ComponentFixture<ReservationScheduleDayTimesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationScheduleDayTimesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationScheduleDayTimesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
