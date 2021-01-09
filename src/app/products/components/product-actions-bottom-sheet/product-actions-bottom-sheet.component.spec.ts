import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductActionsBottomSheetComponent } from './product-actions-bottom-sheet.component';

describe('ProductActionsBottomSheetComponent', () => {
  let component: ProductActionsBottomSheetComponent;
  let fixture: ComponentFixture<ProductActionsBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductActionsBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductActionsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
