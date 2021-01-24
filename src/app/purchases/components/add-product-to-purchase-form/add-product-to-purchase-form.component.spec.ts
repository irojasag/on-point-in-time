import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductToPurchaseFormComponent } from './add-product-to-purchase-form.component';

describe('AddProductToPurchaseFormComponent', () => {
  let component: AddProductToPurchaseFormComponent;
  let fixture: ComponentFixture<AddProductToPurchaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductToPurchaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductToPurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
