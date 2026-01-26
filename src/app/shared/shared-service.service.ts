import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/dataService/httpService';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  apiController: String = 'api';

  constructor(private httpService: HttpService) {}

  //Create Program.
  createProgram(body: any): Observable<any> {
    let url = `program/add`;
    return this.httpService.post(url, body);
  }

  getMenteeListForProgram(body: any): Observable<any> {
    let url = `program/menteelist/${body.id}`;
    return this.httpService.get(url, body);
  }

  postaddParticipants(body: any): Observable<any> {
    let url = `program/addParticipants`;
    return this.httpService.post(url, body);
  }

  getMentorListForProgram(body: any): Observable<any> {
    let url = `program/mentorList/${body.id}`;
    return this.httpService.get(url, body);
  }

  getProgramGroupMember(body: any): Observable<any> {
    let url = `program/getGroupMembers`;
    return this.httpService.post(url, body);
  }

  getProgramdetails(id: any): Observable<any> {
    let url = `program/getProgramForCoordinator/${id}`;
    return this.httpService.get(url, id);
  }

  // Delete A Program.
  deleteProgram(id: any): Observable<any> {
    let url = `program/delete/${id}`;
    return this.httpService.delete(url);
  }

  uploadExcel(body: any): Observable<any> {
    let url = `cordinator/uploaduserdata`;
    return this.httpService.post(url, body);
  }
  getSurveyList(body: any): Observable<any> {
    let url = `survey/surveyList`;
    return this.httpService.get(url, body);
  }

  getprogramStatus(body: any): Observable<any> {
    let url = `masterData/programStatus`;
    return this.httpService.get(url, body);
  }
  // masterData/programStatus

  getUnMapEmployee(body: any): Observable<any> {
    let url = `cordinator/getUnmapedEmployeeListInProgram/${body.programId}`;
    return this.httpService.get(url, body);
  }

  updateStatus(body: any): Observable<any> {
    let url = `program/updateStatus`;
    return this.httpService.post(url, body);
  }

  getAppointmentList(body: any): Observable<any> {
    let url = `program/appointmentGetList`;
    return this.httpService.post(url, body);
  }

  getappointmentMentorSchedule(body: any): Observable<any> {
    let url = `program/appointmentMentorSchedule`;
    return this.httpService.post(url, body);
  }
  // getPrgramForMentorMentee(body: any): Observable<any> {
  //   let url = `program/getProgramForEmployee/${body.id}/${body.eid}`;
  //   return this.httpService.get(url, body);
  // }

  deleteParticipant(body: any): Observable<any> {
    let url = `program/deleteProgramAttendyee/${body.programId}/${body.empId}`;
    return this.httpService.delete(url);
  }

  createAppointmentSlots(body: any): Observable<any> {
    let url = `program/appointmentCreate`;
    return this.httpService.post(url, body);
  }

  bookAppointmentSlots(body: any): Observable<any> {
    let url = `program/appointmentBook`;
    return this.httpService.post(url, body);
  }

  deleteApointmentList(body: any): Observable<any> {
    let url = `program/cancelAppointment`;
    return this.httpService.post(url, body);
  }

  lanchServey(body: any): Observable<any> {
    let url = `survey1/lounchProgramSurvey`;
    return this.httpService.post(url, body);
  }

  deleteAppointmentSlot(body: any): Observable<any> {
    let url = `program/appointmentDelete`;
    return this.httpService.post(url, body);
  }

  getSurveyQuestionnaire(id: any): Observable<any> {
    let url = `survey/questionnaire/${id}`;
    return this.httpService.get(url, id);
  }

  RunAlgorithm(body: any): Observable<any> {
    let url = `program/runMatchingAlgo`;
    return this.httpService.post(url, body);
  }

  saveAlgorithmMapping(body: any): Observable<any> {
    let url = `program/saveMapping`; 
    return this.httpService.post(url, body);
  }

  postFeedback(body: any): Observable<any> {
    let url = `feedback/add`;
    return this.httpService.post(url, body);
  }

  // getFeedback(body: any): Observable<any> {
  //   let url = `feedback/fetch/${body.id}`;
  //   return this.httpService.get(url, body);
  // }
  getFeedback(body: any): Observable<any> {
    let url = `feedback/fetch/${body.id}/${body.AttendeeId}`;
    return this.httpService.get(url, body);
  }

  changePassword(body: any): Observable<any> {
    let url = `profile/changePassword`;
    return this.httpService.post(url, body);
  }
}
