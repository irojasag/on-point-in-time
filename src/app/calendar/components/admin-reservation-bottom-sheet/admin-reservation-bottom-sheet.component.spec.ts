import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservationBottomSheetComponent } from './admin-reservation-bottom-sheet.component';

describe('AdminReservationBottomSheetComponent', () => {
  let component: AdminReservationBottomSheetComponent;
  let fixture: ComponentFixture<AdminReservationBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReservationBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReservationBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
