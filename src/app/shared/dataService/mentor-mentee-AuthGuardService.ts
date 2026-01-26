import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class MenteeMentorguard implements CanActivate {
    loginDetails: any;
    constructor(public router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const routePath = route.routeConfig?.path;
        this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
      
        if (this.loginDetails && this.loginDetails.roleId === '102' && routePath === 'mentor') {
          return true;
        } else if (this.loginDetails && this.loginDetails.roleId === '103' && routePath === 'mentee') {
          return true;
        } else if (this.loginDetails && this.loginDetails.roleId === '104' && routePath === 'cordinator') {
          return true;
        } else {
          // If none of the conditions match, deny access
          return false;
        }
}

}
