import { TestBed } from '@angular/core/testing';

import { MenteeServiceService } from './mentee-service.service';

xdescribe('MenteeServiceService', () => {
  let service: MenteeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenteeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
