import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveycreateComponent } from './surveycreate.component';

describe('SurveycreateComponent', () => {
  let component: SurveycreateComponent;
  let fixture: ComponentFixture<SurveycreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveycreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveycreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
