import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDetialsComponent } from './session-detials.component';

describe('SessionDetialsComponent', () => {
  let component: SessionDetialsComponent;
  let fixture: ComponentFixture<SessionDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionDetialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
