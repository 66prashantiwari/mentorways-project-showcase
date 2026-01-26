import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnswerFormComponent } from './survey-answer-form.component';

describe('SurveyAnswerFormComponent', () => {
  let component: SurveyAnswerFormComponent;
  let fixture: ComponentFixture<SurveyAnswerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyAnswerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyAnswerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
