import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from './httpService';

@Injectable({
  providedIn: 'root'
})
export class DocumentDialogService {
  
  constructor(private httpService: HttpService) {}

  public showDialogSubject = new Subject();

  uploadDocument(body: any): Observable<any> {
    let url = `document/uploadDcoument`;
    return this.httpService.post(url, body);
  }

  getUserDocument(body: any): Observable<any> {
    let url = `document/getuserDcouments`;
    return this.httpService.get(url, body);
  }

  getDocumentAccessList(body: any): Observable<any> {
    let url = `program/getMasterDocumentAccessList`;
    return this.httpService.get(url, body);
  }

  getProgramDocument(body: any): Observable<any> {
    let url = `document/getProgramDocuments`;
    return this.httpService.post(url, body);
  }

  shareProgramDocument(body: any): Observable<any> {
    let url = `document/shareDocumentprogramLevel`;
    return this.httpService.post(url, body);
  }

  loadImage(body:any): Observable<any>{
    let url = `document/downloadFile?filename=${body.filename}`;
    return this.httpService.get(url,body);
  }

  deleteDocument(body:any): Observable<any>{
    let url= `document/${body.documentId}`;
    return this.httpService.delete(url)
  }

  deleteProgramDocument(body:any): Observable<any>{
    let url = `document/programlevel/${body.programId}/${body.documentId}`;
    return this.httpService.delete(url);
  }
 
}
