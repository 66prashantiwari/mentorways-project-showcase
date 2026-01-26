import { Injectable } from '@angular/core';
import { HttpService } from '../shared/dataService/httpService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyAnswerFormService {
  constructor(private httpService: HttpService) {}

  postServeyAnswer(body: any): Observable<any> {
    let url = `survey/saveQuestionAnswer`;
    return this.httpService.post(url, body);
  }

  getValidedServeyLnk(body: any): Observable<any> {
    let url = `survey/validateSurveyLink/${body.employeeId}/${body.programId}`;
    return this.httpService.get(url, body);
  }
}
