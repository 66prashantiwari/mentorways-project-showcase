import { TestBed } from '@angular/core/testing';

import { SurveyAnswerFormService } from './survey-answer-form.service';

describe('SurveyAnswerFormService', () => {
  let service: SurveyAnswerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyAnswerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
