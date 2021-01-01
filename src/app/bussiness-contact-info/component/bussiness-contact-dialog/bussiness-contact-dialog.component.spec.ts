import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessContactDialogComponent } from './bussiness-contact-dialog.component';

describe('BussinessContactDialogComponent', () => {
  let component: BussinessContactDialogComponent;
  let fixture: ComponentFixture<BussinessContactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
