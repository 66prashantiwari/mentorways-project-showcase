import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesessionComponent } from './createsession.component';

describe('CreatesessionComponent', () => {
  let component: CreatesessionComponent;
  let fixture: ComponentFixture<CreatesessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatesessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
