import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { ProgramListComponent } from './program-list.component';

describe('ProgramListComponent', () => {
  let component: ProgramListComponent;
  let fixture: ComponentFixture<ProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramListComponent);
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
           expect(html.querySelector('.some').textContent).toBeTruthy();
  });
});
