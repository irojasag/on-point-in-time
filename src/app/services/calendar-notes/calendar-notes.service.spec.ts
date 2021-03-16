import { TestBed } from '@angular/core/testing';

import { CalendarNotesService } from './calendar-notes.service';

describe('CalendarNotesService', () => {
  let service: CalendarNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
