import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeLayoutComponent } from './mentee-layout.component';

describe('MenteeLayoutComponent', () => {
  let component: MenteeLayoutComponent;
  let fixture: ComponentFixture<MenteeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenteeLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenteeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
