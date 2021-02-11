import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservationDialogComponent } from './admin-reservation-dialog.component';

describe('AdminReservationDialogComponent', () => {
  let component: AdminReservationDialogComponent;
  let fixture: ComponentFixture<AdminReservationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReservationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
