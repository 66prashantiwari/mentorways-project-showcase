import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/dataService/httpService';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  // apiController: String.

  constructor(private http: HttpService) {}

  login(body: any): Observable<any> {
    let url = `auth/login`;
    return this.http.post(url, body);
  }

  signUp(body: any): Observable<any> {
    let url = `auth/signup`;
    return this.http.post(url, body);
  }
  verify(body: any): Observable<any> {
    let url = `auth/checkuser`;
    return this.http.post(url, body);
  }
  //For Forget Password...
  forgetPassword(body: any): Observable<any> {
    let url = `auth/forgotPassword`;
    return this.http.post(url, body);
  }
  //For Forget Password...
  resetPassword(body: any): Observable<any> {
    let url = `auth/resetPassword`;
    return this.http.post(url, body);
  }

  //Expire Reset Password Link.
  expireResetPasswordLink(body: any): Observable<any> {
    let url = `auth/validateResetPasswordLink/${body.code}`;
    return this.http.get(url, body);
  }
}
