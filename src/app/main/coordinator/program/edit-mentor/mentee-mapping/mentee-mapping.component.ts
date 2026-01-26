import { ToastService } from './../../../../../shared/dataService/toastService';
import { ActivatedRoute } from '@angular/router';
import { CoordinatorServiceService } from './../../../coordinator-service.service';
import { SharedServiceService } from './../../../../../shared/shared-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentee-mapping',
  templateUrl: 'mentee-mapping.component.html',
  styleUrls: ['./mentee-mapping.component.scss'],
})
export class MenteeMappingComponent implements OnInit {
  loader: boolean = false;
  mentorList: any;
  mentee: any;
  menteelist: any;
  selectedCity2: any;
  id: any;
  unmappedMenteeList: Array<any> = [];
  selectedEmployee: any;
  mentormenteeList: any;
  editmentormentee: boolean = false;
  mentorId: any;
  menteeId: any;
  mapingid: any;
  isInvalidEmployee: boolean = false;
  loginDetails: any;
  selectedMentor:any;
  constructor(
    private sharedServiceService: SharedServiceService,
    private coordinatorServiceService: CoordinatorServiceService,
    public activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getMentorMentee();
    this.getMentorList();
    // this.updateMentorList();
    this.getUnmappedMenteeList();
  }

  getMentorList() {
    this.loader = true;
    let data = {
      id: this.id,
    };
    this.sharedServiceService.getMentorListForProgram(data).subscribe(
      (res) => {
        this.loader = false;
        this.mentorList = res.map((el:any) =>{
          return {
            label: `${el.firstName} ${el.lastName}`,
            value : el.employeeId
          }
        });
        console.log(this.mentorList)
        // this.mentee = this.mentorMap.forEach((el: any) => {
        //   this.menteelist = el;
        // });
        // this.getUnmappedMenteeList();
      },
      (error: any) => {
        this.loader = false;
      }
    );
  }

  updateMentorMapping(mentor: any) {
    if (this.selectedMentor) {
      this.loader = true;
      let data = {
        mentorId: this.selectedMentor.value ,
        menteeId: mentor.menteeId,
        programId: this.id,
        mappingId: mentor.mapingId
      };
      this.coordinatorServiceService.updateMentorMapping(data).subscribe(
        (res) => {
          this.loader = false;
          this.toastService.showSuccess('Mentee mapped successfully');
          mentor.isInvalidEmployee = false;
          this.getMentorMentee();
        },
        (error: any) => {
          this.loader = false;
          this.toastService.showError('Something Is Wrong');
        }
      );
    } else {
      mentor.isInvalidEmployee = true;
    }
  }

  // deleteRow(index: any) {
  //   this.menteelist.removeAt(index, 1);
  // }

  //For Delete Mentor and Mentee
  deleteMentorMentee(mentee: any) {
    this.loader = true;
    console.log(mentee);
    let data = {
      mentorId: 0,
      menteeId: mentee.MenteeId,
      programId: this.id,
    };
    this.coordinatorServiceService.updateMentorMapping(data).subscribe(
      (res) => {
        this.loader = false;
        this.toastService.showSuccess('Mentee mapping updated successfully.');
        // this.getMentorList();
      },
      (error: any) => {
        this.loader = false;
        this.toastService.showError('Something Is Wrong');
      }
    );
  }
  getUnmappedMenteeList() {
    this.loader = true;
    this.coordinatorServiceService.getUnmappedMenteeList(this.id).subscribe(
      (res) => {
        this.loader = false;
        this.unmappedMenteeList = res.map((el: any) => ({
          ...el,
          name: `${el.firstname} ${el.lastname}`,
        }));
      },
      (error: any) => {
        this.loader = false;
        this.toastService.showError(error.error.errorMessage);
      }
    );
  }

  getMentorMentee() {
    this.loader = true;
    this.coordinatorServiceService.getMentorMenteeList(this.id).subscribe(
      (res: any) => {
        this.mentormenteeList = res.data.map((el: any) => {
          this.editmentormentee = false;
          return { ...el, editmentormentee: this.editmentormentee };
        });
        this.loader = false;
      },
      (error: any) => {
        this.loader = false;
      }
    );
  }

  editMetorMentee(mentormentee: any) {
    mentormentee.editmentormentee = true;
    this.mentorId = mentormentee.mentorId;
    this.menteeId = mentormentee.menteeId;
  }
}
