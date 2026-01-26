import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeProgramComponent } from './mentee-program.component';

describe('MenteeProgramComponent', () => {
  let component: MenteeProgramComponent;
  let fixture: ComponentFixture<MenteeProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenteeProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenteeProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
