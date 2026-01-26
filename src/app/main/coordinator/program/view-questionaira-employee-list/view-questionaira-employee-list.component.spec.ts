import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionairaEmployeeListComponent } from './view-questionaira-employee-list.component';

describe('ViewQuestionairaEmployeeListComponent', () => {
  let component: ViewQuestionairaEmployeeListComponent;
  let fixture: ComponentFixture<ViewQuestionairaEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuestionairaEmployeeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuestionairaEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
