import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBottomSheetComponent } from './purchase-bottom-sheet.component';

describe('PurchaseBottomSheetComponent', () => {
  let component: PurchaseBottomSheetComponent;
  let fixture: ComponentFixture<PurchaseBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
