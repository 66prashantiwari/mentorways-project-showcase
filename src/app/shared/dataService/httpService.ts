import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment'
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders,HttpBackend } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { GlobalDataService } from "./globalDataService";


@Injectable({
    providedIn:'root'
})

export class HttpService{
    constructor(private http: HttpClient,private httpBackend: HttpBackend, 
        private localstorage:GlobalDataService) {}
    
      post(url: string, data: any): Observable<any> {
        console.error("hit will be made to",`${environment.apiUrl}${url}`)
        const headers = new HttpHeaders();
        return this.http.post(`${url}`, data).pipe(
          catchError((error) => {
            console.error('browser side error occured', error);
            return throwError(error);
          })
        );
      }
      postMultipart(url: string, data: any): Observable<any> {
        const header = new HttpHeaders({
          'Authorization': `${this.localstorage.getAccessToken()}`
        });
        const newHttpClient = new HttpClient(this.httpBackend);
        return newHttpClient.post(`${environment.apiUrl}${url}`, data,{headers:header})
        .pipe(
          catchError((error) => {
            console.error('browser side error occured', error);
            return throwError(error);
          })
        );
      }
    
      get(url: string, data: any) {
        return this.http.get(url, data);
      }
    
    
      delete(url: string): Observable<any> {
        return this.http.delete(url).pipe(
          catchError((error) => {
            console.error('browser side error occured', error);
            return throwError(error);
          })
        );
      }

      put(url: string, data: any): Observable<any> {
        console.error("hit will be made to",`${environment.apiUrl}${url}`)
        const headers = new HttpHeaders();
        return this.http.put(`${url}`, data,).pipe(
          catchError((error) => {
            console.error('browser side error occured', error);
            return throwError(error);
          })
        );
      }
      
      
}