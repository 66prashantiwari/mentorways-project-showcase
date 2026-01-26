import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentorServiceService } from 'src/app/main/mentor/mentor-service.service';
import { ToastService } from '../dataService/toastService';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss'],
})
export class ProgramListComponent implements OnInit {
  loader: boolean = false;
  statusId: any;
  programlist: any;
  roleId: any;
  programStatus: any;
  length: any;
  pendingLength: any;
  completeLength: any;
  programlistLength: any;
  programlistPendLength: any;
  programlistLaunchLength: any;
  editProgramData: any;
  editComp: boolean = false;
  id: any;
  display: boolean = false;
  programDuplicateList: any;
  userDetails: any;
  searchvalue: any;
  allMember: any;

  constructor(
    private mentorServiceService: MentorServiceService,
    private router: Router,
    private tosterService: ToastService,
    private sharedService: SharedServiceService,
    private chageDetecter: ChangeDetectorRef,
    private ToastService: ToastService
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
  }

  ngOnInit(): void {
    // this.getProgramList();
    if (this.userDetails.roleId == '101') {
      this.getProgramList();
    } else {
      this.getProgramForMentorMentee();
    }
  }

  gotoListpage(program: any) {
    this.roleId = ''//JSON.parse(localStorage.getItem('loginDetails')!).roleId;
    if (this.roleId == 101) {
      this.router.navigateByUrl(`/cordinator/ProgramDetail/${program.Id}`);
    } else if (this.roleId == 102) {
      this.router.navigateByUrl(`/mentor/program-details/${program.programId}`);
    } else if (this.roleId == 103) {
      this.router.navigateByUrl(`/mentee/ProgramDetail/${program.programId}`);
    }
  }

  getProgramForMentorMentee() {
    const params: any = {};
    (params.userId = this.userDetails.employeeId),
      (params.roleId = this.userDetails.roleId);
    this.mentorServiceService.getPrgramForMentorMentee(params).subscribe({
      next: (result: any) => {
        // console.log(result);
        this.loader = false;
        this.programlist = result.reverse();
        console.log(this.programlist, ' this.programlist>>>>>>>>');
        this.programDuplicateList = this.programlist;
        this.programlistLength = result.filter((el: any) => {
          this.loader = false;
          if (el.statusLabel == 'Completed') {
            return el;
          }
        });
        this.programlistPendLength = result.filter((el: any) => {
          this.loader = false;
          if (el.statusLabel == 'Pending') {
            return el;
          }
        });
        console.log(this.programDuplicateList);
        this.length = this.programlist.length;
        this.completeLength = this.programlistLength.length;
        this.pendingLength = this.programlistPendLength.length;
      },
      error: (error) => {
        this.loader = false;
        this.tosterService.showError('Somthing  Is Wrong');
      },
    });
  }

  getProgramList() {
    this.loader = true;
    this.roleId = '';//JSON.parse(localStorage.getItem('loginDetails')!).roleId;
    if (this.roleId == '101') {
      this.id = 0;
    }
    if (this.roleId == '102') {
      this.id = this.userDetails.userId;
    }
    if (this.roleId == '103') {
      this.id = this.userDetails.userId;
    }
    // if (this.roleId == 101) {
    this.mentorServiceService.getProgramListForCoordinator(this.id).subscribe(
      (res: any) => {
        this.loader = false;
        this.programlist = res.reverse();
        this.allMember = res.length;
        console.log(this.allMember, ' this.allMember');
        this.programDuplicateList = this.programlist;
        console.log(this.programDuplicateList);
        this.programlistLength = res.filter((el: any) => {
          this.loader = false;
          if (el.statusLabel == 'Completed') {
            return el;
          }
        });
        this.programlistPendLength = res.filter((el: any) => {
          this.loader = false;
          if (el.statusLabel == 'Pending') {
            return el;
          }
        });
        this.programlistLaunchLength = res.filter((el: any) => {
          this.loader = false;
          if (el.statusLabel == 'Launched') {
            return el.statusLabel;
          }
        });
        console.log(
          this.programlistLaunchLength,
          ' this.programlistLaunchLength'
        );
        this.length = this.programlist.length;
        this.completeLength = this.programlistLength.length;
        this.pendingLength = this.programlistPendLength.length;
        this.programlistLaunchLength = this.programlistLaunchLength.length;
      },

      (error: any) => {
        this.loader = false;
        this.ToastService.showError('Something Is Wrong');
      }
    );
  }

  getPendingList() {
    this.programDuplicateList = this.programlist.filter((el: any) => {
      if (el.statusLabel == 'Pending') {
        return el;
      }
    });
  }

  getCompletedList() {
    this.programDuplicateList = this.programlist.filter((el: any) => {
      if (el.statusLabel == 'Completed') {
        return el;
      }
    });
  }

  deletelist(program: any) {
    this.display = true;
    this.id = program.Id;
  }

  deleteProgram() {
    console.log(this.id);
    this.loader = true;

    this.sharedService.deleteProgram(this.id).subscribe({
      next: (result: any) => {
        this.loader = false;
        this.display = false;
        this.tosterService.showSuccess('Program Deleted successfully.');
        this.getProgramList();
      },
      error: (error: any) => {
        this.loader = false;
      },
    });
  }

  editProgram(program: any) {
    if (this.userDetails.roleId == '101') {
      this.router.navigate(['shared/EditProgram', program.Id]);
    } else {
      this.router.navigate(['shared/EditProgram', program.programId]);
    }
    this.chageDetecter.detectChanges();
  }
}
