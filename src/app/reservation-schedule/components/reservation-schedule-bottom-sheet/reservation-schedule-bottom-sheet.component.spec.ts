import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationScheduleBottomSheetComponent } from './reservation-schedule-bottom-sheet.component';

describe('ReservationScheduleBottomSheetComponent', () => {
  let component: ReservationScheduleBottomSheetComponent;
  let fixture: ComponentFixture<ReservationScheduleBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationScheduleBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationScheduleBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
