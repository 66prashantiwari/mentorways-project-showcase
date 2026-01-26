import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAlogorithmComponent } from './run-alogorithm.component';

describe('RunAlogorithmComponent', () => {
  let component: RunAlogorithmComponent;
  let fixture: ComponentFixture<RunAlogorithmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunAlogorithmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunAlogorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
