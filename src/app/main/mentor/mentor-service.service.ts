import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/dataService/httpService';
@Injectable({
  providedIn: 'root',
})
export class MentorServiceService {
  constructor(private httpService: HttpService) {}

  systemStatus(body: any): Observable<any> {
    let url = `systemStatus`;
    return this.httpService.get(url, body);
    //  http://localhost:3001/systemStatus
  }

  getPrgramForMentorMentee(body: any): Observable<any> {
    // let url = `program/getProgramForEmployee/0/${eid}`;
    let url = `program/getProgramForEmployee/0/${body.userId}?roleId=${body.roleId}`;
    return this.httpService.get(url, body);
  }

  getProgramListForCoordinator(id: any) {
    let url = `program/getProgramForCoordinator/${id}`;
    return this.httpService.get(url, id);
  }

  getDashbordCountMentee(body: any): Observable<any> {
    let url = `cordinator/getDashboardCount/${body.employeeId}?roleId=${body.roleId}`;
    return this.httpService.get(url, body);
  }
}
