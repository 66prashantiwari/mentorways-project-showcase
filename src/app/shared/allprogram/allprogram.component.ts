import { Component, OnInit } from '@angular/core';
import { MentorServiceService } from 'src/app/main/mentor/mentor-service.service';
import { ToastService } from '../dataService/toastService';
@Component({
  selector: 'app-allprogram',
  templateUrl: './allprogram.component.html',
  styleUrls: ['./allprogram.component.scss'],
})
export class AllprogramComponent implements OnInit {
  programlist: any;
  programStatus: any;
  roleId: any;
  loader: boolean = false;
  constructor(
    private mentorServiceService: MentorServiceService,
    private toasterService: ToastService
  ) {}

  ngOnInit(): void {
    this.roleId = JSON.parse(localStorage.getItem('loginDetails')!).roleId;
    this.getProgramList();
  }

  getProgramList() {
    this.loader = true;
    let data = {
      roleId: this.roleId,
    };
    if (this.roleId == 101) {
      this.mentorServiceService.getProgramListForCoordinator(data).subscribe(
        (res) => {
          this.loader = false;
          this.programlist = res;
        },
        (error: any) => {
          this.loader = false;
          this.toasterService.showError('Something Is Wrong');
        }
      );
    } else {
      this.mentorServiceService.getPrgramForMentorMentee(data).subscribe(
        (res) => {
          this.loader = false;
          this.programlist = res;
          console.log(this.programlist, '============');
        },
        (error: any) => {
          this.loader = false;
          this.toasterService.showError('Something Is Wrong');
        }
      );
    }
  }
}
