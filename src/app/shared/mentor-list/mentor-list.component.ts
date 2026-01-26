import { SharedServiceService } from './../shared-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../dataService/toastService';
@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.scss'],
})
export class MentorListComponent implements OnInit {
  mentorlist: any=[];
  id: any;
  // Id: any;
  loader: boolean = false;
  loginDetails: any;
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

    
    if (this.loginDetails.roleId == '103') {
      this.getMentorGroupList();
    }
    else{
      this.getMentorList();
    }
    this.getProgramDetails();
  }

  getMentorList() {
    this.loader = true;
    let data = {
      id: this.id,
    };
    this.sharedServiceService.getMentorListForProgram(data).subscribe(
      (res) => {
        this.loader = false;
        this.mentorlist = res;
        console.log(this.mentorlist, 'this.mentorlist ');
      },
      (error: any) => {
        this.loader = false;
        this.toasterService.showError('Something Is Wrong');
      }
    );
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

  getMentorGroupList() {
    this.loader = true;
    let data = {
      programId: this.id,
      menteeId: this.loginDetails.employeeId,
    };
    this.sharedServiceService.getProgramGroupMember(data).subscribe(
      (res) => {
        this.loader = false;
        this.metorGrouplist = res.data.mentor
          .map((item: any) => {
            return {
              userId: item.mentorId,
              dob: item.dob,
              email: item.email,
              firstName: item.firstName,
              lastName: item.lastName,
            };
          })
          // .forEach((item: any) => this.mentorlist.push(item));
          this.mentorlist = this.metorGrouplist ;
        // this.menteelist.push(this.MenteeGrouplist);
        console.log(this.mentorlist, 'metooooooooooooooooo');
      },
      (error: any) => {
        this.loader = false;
        this.toasterService.showError('Something Is Wrong');
      }
    );
  }
}
