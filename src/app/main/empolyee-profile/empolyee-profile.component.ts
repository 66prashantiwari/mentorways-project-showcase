import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empolyee-profile',
  templateUrl: './empolyee-profile.component.html',
  styleUrls: ['./empolyee-profile.component.scss'],
})
export class EmpolyeeProfileComponent implements OnInit {
  loginDetails: any;
  constructor() {
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
    console.log(this.loginDetails);
  }
  ngOnInit(): void {}
}
