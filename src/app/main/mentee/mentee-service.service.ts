import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpService } from 'src/app/shared/dataService/httpService';

@Injectable({
  providedIn: 'root'
})
export class MenteeServiceService {

  constructor(private httpService:HttpService) { }


  getProgramListForMentee(body: any): Observable<any> {
    let url = `program/getProgramForEmployee/101?eid=101`;
   return this.httpService.get(url, body);
  } 

}