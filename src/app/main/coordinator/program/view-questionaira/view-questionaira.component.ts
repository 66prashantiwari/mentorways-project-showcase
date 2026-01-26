import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/dataService/toastService';
import { ActivatedRoute } from '@angular/router';
import { CordinatorService } from '../../coordinator-dashboard/coordinator-dashboard.service';
@Component({
  selector: 'app-view-questionaira',
  templateUrl: './view-questionaira.component.html',
  styleUrls: ['./view-questionaira.component.scss'],
})
export class ViewQuestionairaComponent implements OnInit {
  questionData: any = [];
  loader: boolean = false;
  programId: number;
  loginDetails: any;
  selectedeEmployee: number = 0;
  employeList: any = [];
  constructor(
    private cordinatorService: CordinatorService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToastService
  ) {
    this.programId = this.activatedRoute.snapshot.params['id'];
    this.selectedeEmployee = this.activatedRoute.snapshot.params['empId'];
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
  }

  ngOnInit(): void {
    this.getServeyResponse();
    this.getParticipantList();
  }

  public getParticipantList = () => {
    this.cordinatorService
      .getProgramParticipantList({ programId: this.programId })
      .subscribe({
        next: (result) => {
          this.employeList = result.data.map((item: any) => {
            return {
              label: `${item.firstName} ${item.lastName}`,
              value: item.employeId,
            };
          });
        },
        error: (error) => {},
      });
  };

  getServeyResponse() {
    const params: any = {};
    params.programId = this.programId;
    params.userId = this.selectedeEmployee;
    this.cordinatorService.getResponseServey(params).subscribe({
      next: (result: any) => {
        console.log(result);
        this.questionData = result.data;
      },
      error: (error) => {},
    });
  }
}
