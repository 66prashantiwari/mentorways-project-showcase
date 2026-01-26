import { Component, OnInit } from '@angular/core';
import { CoordinatorServiceService } from '../../coordinator-service.service';
import { FormControlName } from '@angular/forms';
import { ToastService } from 'src/app/shared/dataService/toastService';

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.scss'],
})
export class SurveyViewComponent implements OnInit {
  questionData: any;
  selectedCategory: any;
  loader: boolean = false;

  constructor(
    private coordinatorServiceService: CoordinatorServiceService,
    private tosterService: ToastService
  ) {}

  ngOnInit(): void {
    this.getQuestionNaira();
  }
  getQuestionNaira() {
    this.loader = true;
    let data = {};
    this.coordinatorServiceService.getSurveyForQuestionnaire(data).subscribe(
      (res: any) => {
        this.loader = false;
        this.questionData = res;
        console.log(res, '================--------');
      },
      (error: any) => {
        this.loader = false;
        this.tosterService.showError('Something Is Wrong');
      }
    );
  }
}
