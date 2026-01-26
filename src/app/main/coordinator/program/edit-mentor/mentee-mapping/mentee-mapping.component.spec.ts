import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeMappingComponent } from './mentee-mapping.component';

describe('MenteeMappingComponent', () => {
  let component: MenteeMappingComponent;
  let fixture: ComponentFixture<MenteeMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenteeMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenteeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
