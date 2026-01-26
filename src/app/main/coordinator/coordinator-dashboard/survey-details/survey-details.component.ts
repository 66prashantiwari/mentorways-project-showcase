import { Component, OnInit } from '@angular/core';
import { CoordinatorServiceService } from '../../coordinator-service.service';
import { ActivatedRoute } from '@angular/router';
import { CordinatorService } from '../coordinator-dashboard.service';
import { ToastService } from 'src/app/shared/dataService/toastService';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss'],
})
export class SurveyDetailsComponent implements OnInit {
  loader: boolean = false;
  display: boolean = false;
  Id: any;
  details: any;
  SurveyDetils: any;
  optionListAtoZ: any = [];

  constructor(
    private coordinatorServiceService: CoordinatorServiceService,
    private activatedRoute: ActivatedRoute,
    private cordinatorService: CordinatorService,
    private toastService: ToastService
  ) {
    this.Id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.detailservey();
  }

  detailservey() {
    this.loader = true;
    this.optionListAtoZ = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let data = {
      id: this.Id,
    };
    this.cordinatorService.getByServeyId(data).subscribe(
      (res: any) => {
        this.loader = false;
        this.details = res.data;
        console.log(this.details, 'this.details');
        this.SurveyDetils = this.details.question;
        console.log(this.SurveyDetils, 'this.SurveyDetils');
      },
      (error: any) => {
        this.loader = false;
        this.toastService.showError('Something Is Wrong');
      }
    );
  }
}
