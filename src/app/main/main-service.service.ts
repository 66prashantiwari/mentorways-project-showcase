import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/dataService/httpService';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService {
  constructor(private httpService: HttpService) {}

  getAppoinments(body: any): Observable<any> {
    let url = `program/getAppointmentListByDate`;
    return this.httpService.post(url, body);
  }
  getFeedback(body: any): Observable<any> {
    let url = `feedback/fetch/${body.id}`;
    return this.httpService.get(url, body);
  }
}
