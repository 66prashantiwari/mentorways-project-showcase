import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionairaComponent } from './view-questionaira.component';

describe('ViewQuestionairaComponent', () => {
  let component: ViewQuestionairaComponent;
  let fixture: ComponentFixture<ViewQuestionairaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuestionairaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuestionairaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
