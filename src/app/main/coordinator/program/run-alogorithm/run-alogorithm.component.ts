import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { ProgramDataServiceService } from './../program-data-service.service';
import { ProgramComponent } from './../program.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/dataService/toastService';

@Component({
  selector: 'app-run-alogorithm',
  templateUrl: './run-alogorithm.component.html',
  styleUrls: ['./run-alogorithm.component.scss'],
})
export class RunAlogorithmComponent implements OnInit {
  QuestionList: any;
  loader: boolean = false;
  id: any;
  mentorSurveyId: any;
  menteeSurveyId: any;
  Id: any;
  questionList: any = [];

  menteeQuestionList: Array<any> = [];
  menteeIndexMapping: any = {};
  priority: any = [];
  idIndexMapping: any = {};
  mentorQuestionnaire: boolean = true;
  menteeQuestionnaire: boolean = false;
  menteeIndexMappingError: boolean = false;
  runAlgorithmData: any;
  mappingData: any;
  loginDetails: any = JSON.parse(localStorage.getItem('loginDetails') || '');

  constructor(
    private activatedRoute: ActivatedRoute,
    private ProgramDataServiceService: ProgramDataServiceService,
    private sharedServiceService: SharedServiceService,
    private router: Router,
    private tosterService: ToastService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.getProgramDetails();
  }

  ngOnInit(): void {
    console.log(this.ProgramDataServiceService);
  }

  getProgramDetails() {
    this.loader = true;
    this.sharedServiceService.getProgramdetails(this.id).subscribe(
      (res) => {
        this.loader = false;
        this.menteeSurveyId = res[0].menteeSurveyId;
        this.mentorSurveyId = res[0].mentorSurveyId;
        this.getQuestionnaire();
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  getQuestionnaire() {
    this.sharedServiceService
      .getSurveyQuestionnaire(this.mentorSurveyId)
      .subscribe((res: any) => {
        this.questionList = res.data.question.map((el: any, i: any) => {
          priority: el.priority;
          index: i;

          return { ...el, priority: 0, index: i };
        });
      });
    this.sharedServiceService
      .getSurveyQuestionnaire(this.menteeSurveyId)
      .subscribe((res: any) => {
        this.menteeQuestionList = res.data.question.map((el: any, i: any) => {
          priority: el.priority;
          index: i;

          return { ...el, priority: 0, index: i };
        });
      });
  }

  runAlgorithm() {
    this.loader = true;
    if (
      this.idIndexMappingList.length > 0 &&
      this.menteeIndexMappingList.length > 0
    ) {
      let req = {
        programId: this.id,
        priority: this.priority.join(),
        idIndexMapping: this.idIndexMapping,
        menteeIndexMapping: this.menteeIndexMapping,
      };
      this.sharedServiceService.RunAlgorithm(req).subscribe((res: any) => {
        this.runAlgorithmData = res.data.mapping;
        this.mappingData = res.mappingReq;
        this.loader = false;
        this.menteeIndexMappingError = false;
        this.tosterService.showSuccess('Algorithm run successfully.');
      });
    } else {
      this.loader = false;
      this.menteeIndexMappingError = true;
    }
  }

  idIndexMappingList: any = [];
  menteeIndexMappingList: any = [];
  
  runAlgo() {
    this.priority = [];
    const tempMentorData = [...this.questionList];
    const tempMenteeData = [...this.menteeQuestionList];
    tempMentorData.sort((a: any, b: any) => {
      return a.priority - b.priority;
    });
    tempMenteeData.sort((a: any, b: any) => {
      return a.priority - b.priority;
    });

    for (let [index, record] of tempMentorData.entries()) {
      if (record.priority > 0) {
        this.priority.push(record.index);
        this.idIndexMapping[record.Id] = index;
        this.idIndexMappingList.push(this.idIndexMapping);
      }
    }
    for (let [index, record] of tempMenteeData.entries()) {
      if (record.priority > 0) {
        this.menteeIndexMapping[record.Id] = index;
        this.menteeIndexMappingList.push(this.menteeIndexMapping);
      }
    }

    this.runAlgorithm();
  }

  SaveAlgoMapping() {
    this.loader = true;
    let req = {
      mapping: this.mappingData,
      programId: this.id,
      accountId: this.loginDetails.roleId,
    };
    this.sharedServiceService.saveAlgorithmMapping(req).subscribe(
      (res: any) => {
        this.router.navigateByUrl(`cordinator/mapping/${this.id}`);
        this.tosterService.showSuccess('Mapping saved successfully.');
        this.loader = false;
      },
      (error: any) => {
        this.loader = false;
      }
    );
  }
}
