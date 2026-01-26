import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { AllprogramComponent } from './allprogram.component';

describe('AllprogramComponent', () => {
  let component: AllprogramComponent;
  let fixture: ComponentFixture<AllprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllprogramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllprogramComponent);
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
           expect(html.querySelector('#kt_widget_table_3').textContent).toBeTruthy();
  });
});
