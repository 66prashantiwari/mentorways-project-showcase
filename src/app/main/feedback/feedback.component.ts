import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/shared/dataService/toastService';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  loader: boolean = false;
  display: boolean = false;
  id: any;
  Id: any;
  searchvalue: any; 
  loginDetails: any;
  feedbackList: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tosterService: ToastService,
    private sharedServiceService: SharedServiceService,
    private mainService: MainServiceService
  ) {
    this.Id = this.activatedRoute.snapshot.params['id'];
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
    console.log(this.loginDetails);
  }

  ngOnInit(): void {
    this.getFeedback();
  }

  // getFeedback() {
  //   // if (this.loginDetails.roleId == '102') {
  //   //   this.mentorId = this.loginDetails.userId;
  //   // }
  //   // if (this.loginDetails.roleId == '103') {
  //   //   this.mentorId = this.mentorlist[0].userId;
  //   // }
  //   let data = {
  //     id: this.Id,
  //   };
  //   this.mainService.getFeedback(data).subscribe((res: any) => {
  //     this.feedbackList = res.data[0];
  //     console.log(this.feedbackList, 'this.feedbackList');
  //   });
  // }

  getFeedback() {
    console.log(this.Id);
    let data = {
      id: this.Id,
      AttendeeId: this.loginDetails.roleId,
    };
    this.sharedServiceService.getFeedback(data).subscribe((res: any) => {
      this.feedbackList = res.data;
      console.log(this.feedbackList, 'this.feedbackList');
    });
  }
}
