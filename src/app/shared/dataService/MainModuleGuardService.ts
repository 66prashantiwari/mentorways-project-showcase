import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable()
export class Routerguard implements  CanActivateChild {
  constructor(public router: Router) {}



  canActivateChild() {
    
    if (localStorage.getItem('token')) {
      return true;
    } else {
     return this.router.createUrlTree(['/auth/login']);
    }
  }
}
