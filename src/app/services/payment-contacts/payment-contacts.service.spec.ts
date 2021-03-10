import { TestBed } from '@angular/core/testing';

import { PaymentContactsService } from './payment-contacts.service';

describe('PaymentContactsService', () => {
  let service: PaymentContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
