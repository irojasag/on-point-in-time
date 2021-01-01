import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessContactBottomSheetComponent } from './bussiness-contact-bottom-sheet.component';

describe('BussinessContactBottomSheetComponent', () => {
  let component: BussinessContactBottomSheetComponent;
  let fixture: ComponentFixture<BussinessContactBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessContactBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessContactBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
