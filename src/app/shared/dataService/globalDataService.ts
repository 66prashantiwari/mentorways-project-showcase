import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  userInfo: BehaviorSubject<any> = new BehaviorSubject({});
  jobFilters: BehaviorSubject<any> = new BehaviorSubject(
    localStorage.getItem('jobFilters')
      ? JSON.parse(`${localStorage.getItem('jobFilters')}`)
      : {}
  );
  refreshToken: BehaviorSubject<any> = new BehaviorSubject(
    localStorage.getItem('refreshToken')
      ? localStorage.getItem('refreshToken')
      : ''
  );
  accessToken: BehaviorSubject<any> = new BehaviorSubject(
    localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : ''
  );
  constructor( private router:Router) {
    if (localStorage.getItem('logedInInfo')) {
      this.userInfo.next(JSON.parse(`${localStorage.getItem('logedInInfo')}`));
    }
  }
  getUserInfoFromLocal() {
    return this.userInfo;
  }
  setUserInfoInLocal(userInfo: any) {
    localStorage.setItem('logedInInfo', JSON.stringify(userInfo));
    this.userInfo.next(userInfo);
  }
  
  getAccessToken() {
    return this.accessToken;
  }
  setAccessToken(accessToken: any) {
    localStorage.setItem('accessToken', `${accessToken}`);
    this.accessToken.next(`${accessToken}`);
  }
  getRefreshToken() {
    return this.refreshToken;
  }
  setRefreshToken(refreshToken: any) {
    localStorage.setItem('refreshToken', `${refreshToken}`);
    this.refreshToken.next(`${refreshToken}`);
  }

  setJobFilterData(data: any) {
    localStorage.setItem('jobFilters', JSON.stringify(data));
    this.jobFilters.next(data);
  }
  getJobFilterData() {
    return this.jobFilters;
  }

  clearLocalstorage(){
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}


