import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateBottomSheetComponent } from './user-update-bottom-sheet.component';

describe('UserUpdateBottomSheetComponent', () => {
  let component: UserUpdateBottomSheetComponent;
  let fixture: ComponentFixture<UserUpdateBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdateBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
