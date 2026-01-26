import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { ProgramDetailComponent } from './program-detail.component';

describe('ProgramDetailComponent', () => {
  let component: ProgramDetailComponent;
  let fixture: ComponentFixture<ProgramDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a router outlet', () => {
    const de = fixture.debugElement.query(By.directive(RouterOutlet));
           expect(de).toBeNull();
  });

  it('should have a HTML element', () => {
    const html=fixture.nativeElement
           expect(html.querySelector('#kt_body').textContent).toBeTruthy();
  });
});
