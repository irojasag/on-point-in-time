import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNoteFormComponent } from './calendar-note-form.component';

describe('CalendarNoteFormComponent', () => {
  let component: CalendarNoteFormComponent;
  let fixture: ComponentFixture<CalendarNoteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarNoteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
