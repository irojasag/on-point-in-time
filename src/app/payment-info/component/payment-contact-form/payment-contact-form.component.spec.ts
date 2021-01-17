import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentContactFormComponent } from './payment-contact-form.component';

describe('PaymentContactFormComponent', () => {
  let component: PaymentContactFormComponent;
  let fixture: ComponentFixture<PaymentContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentContactFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
