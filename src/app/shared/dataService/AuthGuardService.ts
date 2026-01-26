import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable()
export class Loginguard implements  CanActivateChild {
  loginDetails: any;
  constructor(public router: Router) {
  
  }

  canActivateChild() {
    
    if (!localStorage.getItem('token')){
      return  true;
    }else {
      this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') ||'');
      if(this.loginDetails.roleId == '101'){
        return this.router.createUrlTree(['cordinator/CoordinatorDashboard']);
      }else if(this.loginDetails.roleId == '102'){
        return this.router.createUrlTree(['mentor/MentorDashboard']);
      }else if(this.loginDetails.roleId == '103'){
        return this.router.createUrlTree(['mentee/menteeDashboard']);
      }
      return true;
     }
  }
}
