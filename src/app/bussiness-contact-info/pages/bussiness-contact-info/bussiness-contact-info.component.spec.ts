import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessContactInfoComponent } from './bussiness-contact-info.component';

describe('BussinessContactInfoComponent', () => {
  let component: BussinessContactInfoComponent;
  let fixture: ComponentFixture<BussinessContactInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessContactInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
