import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeHeaderComponent } from './mentee-header.component';

describe('MenteeHeaderComponent', () => {
  let component: MenteeHeaderComponent;
  let fixture: ComponentFixture<MenteeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenteeHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenteeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
