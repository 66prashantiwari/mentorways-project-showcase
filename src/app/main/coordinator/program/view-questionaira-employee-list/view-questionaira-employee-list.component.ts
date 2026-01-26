import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-view-questionaira-employee-list',
  templateUrl: './view-questionaira-employee-list.component.html',
  styleUrls: ['./view-questionaira-employee-list.component.scss'],
})
export class ViewQuestionairaEmployeeListComponent implements OnInit {
  questionList: any;
  loader!: boolean;
  id: any;
  mentorlist: any;
  toasterService: any;
  menteelist: any;
  loginDetails: any;
  constructor(
    private sharedServiceService: SharedServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
  }

  ngOnInit(): void {
    this.getMentorList();
    this.getMenteeList();
  }

  getMentorList() {
    this.loader = true;
    let data = {
      id: this.id,
    };
    this.sharedServiceService.getMentorListForProgram(data).subscribe(
      (res: any) => {
        this.loader = false;
        this.mentorlist = res;
        console.log(this.mentorlist, '//////////////////');
      },
      (error: any) => {
        this.loader = false;
        this.toasterService.showError('Something Is Wrong');
      }
    );
  }

  getMenteeList() {
    this.loader = true;
    let data = {
      id: this.id,
    };
    this.sharedServiceService.getMenteeListForProgram(data).subscribe(
      (res: any) => {
        this.loader = false;
        this.menteelist = res;
        console.log(this.menteelist, '-=-=-=--;-;;-;;');
      },
      (error: any) => {
        this.loader = false;
        this.toasterService.showError('Something Is Wrong');
      }
    );
  }

  veiwRespnses(empType: any) {
    this.router.navigate([
      'cordinator/ViewQuestionaira',
      this.id,
      empType.employeeId,
    ]);
  }
}
