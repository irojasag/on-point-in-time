import { TestBed } from '@angular/core/testing';

import { ReservatonScheduleService } from './reservaton-schedule.service';

describe('ReservatonScheduleService', () => {
  let service: ReservatonScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservatonScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
