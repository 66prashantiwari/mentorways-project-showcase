import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/dataService/httpService';


@Injectable({
  providedIn: 'root',
})
export class CordinatorService {
  loader: boolean = false;
  display: boolean = false;
  Id: any;
  details: any;
  constructor(private httpService: HttpService) {}
  postCreateServey(body: any): Observable<any> {
    let url = `survey/questionnaire`;
    return this.httpService.post(url, body);
  }

  getByServeyId(body: any): Observable<any> {
    let url = `survey/questionnaire/${body.id}`;
    return this.httpService.get(url, body);
  }

  getMasterInput(body: any): Observable<any> {
    let url = `survey/getMasterInputTypeList`;
    return this.httpService.get(url, body);
  }
  // Delete A Survey.
  deleteSurvey(body: any): Observable<any> {
    let url = `survey/questionnaire/${body.id}`;
    return this.httpService.delete(url);
  }
//Get update Servey.
  updateCreateServey(body: any): Observable<any> {
    let url = `survey/questionnaire`;
    return this.httpService.put(url, body);
  }
  //Get Servey Details.
  getResponseServey(body:any): Observable<any>{
    let url = `survey/getSurveyResponseByprogramId/${body.programId}/${body.userId}`;
    return this.httpService.get(url,body);
  }

  getProgramParticipantList(body:any): Observable<any>{
    let url = `program/getProgramParticipantList/${body.programId}`;
    return this.httpService.get(url,body);
  }

 
}
