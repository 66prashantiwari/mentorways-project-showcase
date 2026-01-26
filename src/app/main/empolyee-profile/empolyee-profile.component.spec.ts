import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpolyeeProfileComponent } from './empolyee-profile.component';

describe('EmpolyeeProfileComponent', () => {
  let component: EmpolyeeProfileComponent;
  let fixture: ComponentFixture<EmpolyeeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpolyeeProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpolyeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
