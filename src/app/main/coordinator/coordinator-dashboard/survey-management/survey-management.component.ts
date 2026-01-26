import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoordinatorServiceService } from '../../coordinator-service.service';
import { ActivatedRoute } from '@angular/router';
import { CordinatorService } from '../coordinator-dashboard.service';
import { ToastService } from 'src/app/shared/dataService/toastService';

@Component({
  selector: 'app-survey-management', 
  templateUrl: './survey-management.component.html',
  styleUrls: ['./survey-management.component.scss'],
})
export class SurveyManagementComponent implements OnInit {
  surveylist: any;
  loader: boolean = false;
  display: boolean = false;
  id: any;
  searchvalue: any;
  constructor(
    private coordinatorServiceService: CoordinatorServiceService,
    private activatedRoute: ActivatedRoute,
    private cordinatorService: CordinatorService,
    private tosterService: ToastService
  ) {}

  ngOnInit(): void {
    this.getSurveyList();
  }
 
  getSurveyList() {
    this.loader = true;
    let data = { Id: 0 };
    this.coordinatorServiceService.getSurveyForQuestionnaire(data).subscribe(
      (res) => {
        this.loader = false;
        this.surveylist = res.data;
      },
      (error: any) => {
        this.loader = false;
        this.tosterService.showError('Something Is Wrong');
      }
    );
  }

  //For Delete Program.

  deletelist(survey: any) {
    this.display = true;
    this.id = survey.Id;
  }
  deleteSurvey() {
    console.log(this.id, 'this.id');
    this.loader = true;
    let params = {
      id: this.id,
    };
    this.cordinatorService.deleteSurvey(params).subscribe({
      next: (result: any) => {
        this.loader = false;
        this.display = false;
        this.tosterService.showSuccess('Survey deleted successfully.');
        this.getSurveyList();
      },
      error: (error: any) => {
        this.display = false;
        this.loader = false;
        this.tosterService.showError('Something Is Wrong');
      },
    });
  }
  //Edit A Program.
}
