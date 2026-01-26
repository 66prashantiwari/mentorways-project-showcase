import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/dataService/toastService';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { CoordinatorServiceService } from '../../coordinator-service.service';
declare var $: any;

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss'],
})
export class AddParticipantComponent implements OnInit {
  createParticipantsForm: FormGroup = new FormGroup({});
  selectedMentor: any;
  userList: any;
  displayedUser: any = [];
  displayUserId: any = [];
  loader: boolean = false;
  Id: any;
  participants: any;
  isSelectedMentor: boolean = false;
  isInvalidForm: boolean = false;
  userid: any;
  mentorlist: any;
  menteelist: any;
  mentorDuplicateList: any;
  menteeDuplicateList: any;
  employeeId: any;
  deletePopup: boolean = false;
  programDetails: any;
  userDetails: any;
  userListDetail: any;

  constructor(
    private sharedServiceService: SharedServiceService,
    private ToastService: ToastService, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,private router: Router,
    private coordinatorServiceService: CoordinatorServiceService
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
    this.Id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getProgramDetails();
    this.initializeeditfrom();
    this.getMenteeList();
    this.getMentorList();
  }

  initializeeditfrom() {
    this.createParticipantsForm = this.fb.group({
      selectedUser: ['', [Validators.required]],
    });
  }

  getProgramDetails() {
    this.loader = true;
    this.sharedServiceService.getProgramdetails(this.Id).subscribe(
      (res) => {
        this.loader = false;
        this.programDetails = res[0];
        console.log(this.programDetails, '============');
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  getMenteeList() {
    this.loader = true;
    let data = { 
      id: this.Id,
    };
    this.sharedServiceService.getMenteeListForProgram(data).subscribe(
      (res) => {
        this.loader = false;
        this.menteelist = res;
        this.menteeDuplicateList = this.menteelist;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  getMentorList() {
    this.loader = true;
    let data = {
      id: this.Id,
    };
    this.sharedServiceService.getMentorListForProgram(data).subscribe(
      (res) => {
        this.loader = false;
        this.mentorlist = res;
        this.mentorDuplicateList = this.mentorlist;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  close(i: any) {
    this.displayedUser.splice(i, 1);
    this.displayUserId.splice(i, 1);
  }

  addParticipants() {
    console.log(this.displayUserId);
    if (this.createParticipantsForm.valid) {
      if (this.selectedMentor) {
        this.loader = true;
        let data = {
          programId: parseInt(this.Id),
          attendeeRole: parseInt(this.selectedMentor),
          userIds: this.createParticipantsForm.controls['selectedUser'].value.toString(),
        };
        this.sharedServiceService.postaddParticipants(data).subscribe(
          (res) => {
            this.loader = false;
            this.participants = res.data;
            this.getMenteeList();
            this.getMentorList();
            this.ToastService.showSuccess('Participant added successfully.');
            $('#AddParticipant').modal('hide');
            this.createParticipantsForm.reset();
            this.displayedUser = [];
            this.displayUserId = [];
            this.selectedMentor = '';
            this.isInvalidForm = false;
            this.selectedMentor = false;
            this.router;
          },
          (error) => {
            this.ToastService.showError('Something is wrong.');
            this.loader = false;
          }
        );
      } else {
        this.isSelectedMentor = true;
      }
    } else {
      this.isInvalidForm = true;
    }
  }

  closePopup() {
    this.createParticipantsForm.reset();
    this.displayedUser = [];
    this.displayUserId = [];
    this.selectedMentor = '';
    this.isInvalidForm = false;
    this.isSelectedMentor = false;
    $('#AddParticipant').modal('hide');
  }

  searchMentorMentee(event: any) {
    if (event.target.value) {
      this.mentorDuplicateList = this.mentorlist.filter((res: any) => {
        if (
          res.firstName
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          res.lastName.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
          return res;
        }
      });
      this.menteeDuplicateList = this.menteelist.filter((res: any) => {
        if (
          res.firstName
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          res.lastName.toLowerCase().includes(event.target.value.toLowerCase())
        ) {
          return res;
        }
      });
    } else {
      this.mentorDuplicateList = this.mentorlist;
      this.menteeDuplicateList = this.menteelist;
    }
  }

  delete(empId: any) {
    this.deletePopup = true;
    this.employeeId = empId;
  }

  deleteUser() {
    this.loader = true;
    let body = {
      programId: this.Id,
      empId: this.employeeId,
    };
    this.sharedServiceService.deleteParticipant(body).subscribe(
      (res: any) => {
        this.loader = false;
        this.deletePopup = false;
        this.ToastService.showSuccess('Participant deleted successfully.');
        this.getMentorList();
        this.getMenteeList();
      },
      (error: any) => {
        this.loader = false;
        this.ToastService.showError('Something is wrong.');
      }
    );
  }

  userListDetails(){
    this.loader = true;
    let req = {
      programId: this.Id,
    };
    this.sharedServiceService.getUnMapEmployee(req).subscribe(
      (res: any) => {
        this.userList = res.data
        this.loader = false;
        this.displayUserId =  this.createParticipantsForm.controls['selectedUser'].value;
      },
      (error: any) => {
        this.loader = false;
        this.ToastService.showError('Something Is Wrong');
      }
    );
  }

  getSelectedUserId(event:any){
    this.userListDetails();
  }
}
