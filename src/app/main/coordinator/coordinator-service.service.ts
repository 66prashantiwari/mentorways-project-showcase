import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/dataService/httpService';

@Injectable({
  providedIn: 'root', 
})
export class CoordinatorServiceService {
  constructor(private httpService: HttpService) {}

  getProgramForCoordinator(body: any): Observable<any> {
    let url = `program/getProgramForCoordinator/0`;
    return this.httpService.get(url, body);
  }

  getSurveyForQuestionnaire(body: any): Observable<any> {
    let url = `survey/questionnaire/${body.Id}`;
    return this.httpService.get(url, body);
  }

  getSurveyForSurveyList(body: any): Observable<any> {
    let url = `survey/surveyList`;
    return this.httpService.get(url, body);
  }


  uploadExcel(body: any): Observable<any> {
    let url = `cordinator/uploaduserdata`;
    return this.httpService.post(url, body);
  }
  // Get Employee list.
  getGetEmployeeDetail(id: any): Observable<any> {
    let url = `cordinator/getemployeedetail/${id}`;
    return this.httpService.get(url, id);
  }
  // Delete Employee List.
  deleteDetail(body: any): Observable<any> {
    let url = `cordinator/user/` + body.id;
    return this.httpService.delete(url);
  }
  // For Delete and update mentor and mentee

  updateMentorMapping(body: any): Observable<any> {
    let url = `program/updateMentorMapping`;
    return this.httpService.post(url, body);
  }
  getUnmappedMenteeList(programId: any): Observable<any> {
    const url = `program/getUnmatchedMentee/${programId}`;
    return this.httpService.get(url, {});
  }

  addEmployee(body: any): Observable<any> {
    const url = `cordinator/user`;
    return this.httpService.post(url, body);
  }

  updateEmployee(body: any): Observable<any> {
    const url = `cordinator/employee`;
    return this.httpService.put(url, body);
  }

  deleteEmployee(body: any): Observable<any> {
    const url = `cordinator/user/${body.id}`;
    return this.httpService.delete(url);
  }

  getMentorMenteeList(id:any) :Observable<any> {
    const url = `program/mapping/${id}`;
    return this.httpService.get(url , id);
  }
}
