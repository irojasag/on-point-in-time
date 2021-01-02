import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserDataDialogComponent } from './profile-user-data-dialog.component';

describe('ProfileUserDataDialogComponent', () => {
  let component: ProfileUserDataDialogComponent;
  let fixture: ComponentFixture<ProfileUserDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
