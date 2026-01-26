import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from '../dataService/httpService';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  constructor(private httpService: HttpService) {}

  postProgramNotes(body: any): Observable<any> {
    let url = `document/shareNotesProgramLevel`;
    return this.httpService.post(url, body);
  }

  getProgramNotes(body: any): Observable<any> {
    let url = `document/getShareProgramNotes`;
    return this.httpService.post(url,body);
  }

  deleteProgramNote(body:any): Observable<any>{
    let url = `document/notesprogramlevel/${body.programId}/${body.noteId}`;
    return this.httpService.delete(url);
  }

 
}
