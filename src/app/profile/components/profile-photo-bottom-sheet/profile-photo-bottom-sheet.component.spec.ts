import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhotoBottomSheetComponent } from './profile-photo-bottom-sheet.component';

describe('ProfilePhotoBottomSheetComponent', () => {
  let component: ProfilePhotoBottomSheetComponent;
  let fixture: ComponentFixture<ProfilePhotoBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePhotoBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePhotoBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
