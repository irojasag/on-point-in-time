import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationScheduleFormComponent } from './reservation-schedule-form.component';

describe('ReservationScheduleFormComponent', () => {
  let component: ReservationScheduleFormComponent;
  let fixture: ComponentFixture<ReservationScheduleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationScheduleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
