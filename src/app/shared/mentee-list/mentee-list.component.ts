import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
import { ToastService } from '../dataService/toastService';
@Component({
  selector: 'app-mentee-list',
  templateUrl: './mentee-list.component.html',
  styleUrls: ['./mentee-list.component.scss'],
})
export class MenteeListComponent implements OnInit {
  menteelist: any = [];
  id: any;
  loader: boolean = false;
  loginDetails: any;
  MenteeGrouplist: any;
  metorGrouplist: any;
  programDetails: any;
  menteeSurveyId: any;
  mentorSurveyId: any;
  feedback: any;
  constructor(
    private sharedServiceService: SharedServiceService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToastService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');

    this.getMenteeList();
    if (this.loginDetails.roleId == '103') {
      this.getMenteeGroupList();
    }
    this.getProgramDetails();
  }

  getProgramDetails() {
    // console.log(this.Id);
    this.loader = true;
    this.sharedServiceService.getProgramdetails(this.id).subscribe(
      (res) => {
        this.loader = false;
        this.programDetails = res[0];
        this.menteeSurveyId = this.programDetails.menteeSurveyId;
        this.mentorSurveyId = this.programDetails.mentorSurveyId;
        if (
          this.programDetails?.statusLabel == 'Completed' &&
          (this.loginDetails.roleId == 102 || this.loginDetails.roleId == 103)
        ) {
          this.feedback = true;
        }
        console.log(this.programDetails, 'programDetails============');
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  getMenteeList() {
    this.loader = true;
    let data = {
      id: this.id,
    };
    this.sharedServiceService.getMenteeListForProgram(data).subscribe(
      (res) => {
        this.loader = false;
        this.menteelist = res;
        console.log(this.menteelist, 'menteelist-=-=-=--;-;;-;;');
      },
      (error: any) => {
        this.loader = false;
        this.toasterService.showError('Something Is Wrong');
      }
    );
  }

  getMenteeGroupList() {
    this.loader = true;
    let data = {
      programId: this.id,
      userId: this.loginDetails.employeeId,
      // userId: 1269,
      userRoleId: this.loginDetails.roleId,
    };
    this.sharedServiceService.getProgramGroupMember(data).subscribe(
      (res) => {
        console.log(res.data, 'resssssssssssss');
        this.loader = false;
        // if (res.data.mentee.length > 0) {
        this.MenteeGrouplist = res.data.mentee
          .map((item: any) => {
            return {
              userId: item.menteeId,
              dob: item.dob,
              email: item.email,
              firstName: item.firstName,
              lastName: item.lastName,
            };
          })
          .forEach((item: any) => this.menteelist.push(item));
        console.log(
          this.MenteeGrouplist,
          'meteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        );
        // }
      },
      (error: any) => {
        this.loader = false;
        this.toasterService.showError('Something Is Wrong');
      }
    );
  }
}
