import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpPageComponent } from './follow-up-page.component';

describe('FollowUpPageComponent', () => {
  let component: FollowUpPageComponent;
  let fixture: ComponentFixture<FollowUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUpPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
