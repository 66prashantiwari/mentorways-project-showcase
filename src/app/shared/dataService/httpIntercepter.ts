import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { GlobalDataService } from './globalDataService';
import { ToastService } from './toastService';
@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  accessToken: string = '';
  loader: boolean = false;
  constructor(private router: Router, private localstorage: GlobalDataService,
    private toasterService: ToastService) {
    this.loader = true;
    this.localstorage.getAccessToken().subscribe((res) => {
      this.loader = false;
      this.accessToken = res;
    },
    (error: any) => {
      this.loader = false;
      this.toasterService.showError('Something Is Wrong');
    });
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    const req = new HttpRequest(
      <any>httpRequest.method,
      `${environment.apiUrl}${httpRequest.url}`,
      // `${httpRequest.url}`,

      httpRequest.body
    );
    httpRequest = Object.assign(httpRequest, req);

    return next
      .handle(
        httpRequest.clone({
          setHeaders: {
            ApiKey: environment.apiKey,
            //  Authorization: this.accessToken ? `${this.accessToken}` : environment.apiKey,
            //  apitoken:
            Authorization: token ? token : ``,
          },
        })
      )

      .pipe(catchError(this.handleError));
  }
  handleError = (error: HttpErrorResponse) => { 
   
    switch (error.status) {
      case 401: //Unauthorized
        this.localstorage.clearLocalstorage();
        break;
      case 403: // forbidden i.e. not  allowed to access the resource
        break;
      case 500: // internal server error
        break;
      case 404:
        // this.router.navigateByUrl('/error');
        // not found
        break;
      case 503: // service unavailable
        break;
      default:
    }
    return throwError(error);
  };
}
