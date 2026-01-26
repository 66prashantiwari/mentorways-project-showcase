import { Component, OnInit } from '@angular/core';
import { CordinatorService } from '../main/coordinator/coordinator-dashboard/coordinator-dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { SurveyAnswerFormService } from './survey-answer-form.service';
import { ToastService } from '../shared/dataService/toastService';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-survey-answer-form',
  templateUrl: './survey-answer-form.component.html',
  styleUrls: ['./survey-answer-form.component.scss'],
})
export class SurveyAnswerFormComponent implements OnInit {
  editRecipientForm: FormGroup;
  loader: boolean = false;
  display: boolean = false;
  Id: any;
  details: any;
  SurveyDetils: any;
  QuestionId: any;
  questionsSeleted: any;
  question: any = [];
  selectedOptions: any[] = [];
  selectedTextInputs: string[] = [];
  optionListAtoZ: any = [];
  programId: any;
  surveyId: any;
  EmployeeId: any;
  thankyou: any = 0;
  serveyLink: any;
  displayAnwserForm: boolean = false;
  constructor(
    private answerService: SurveyAnswerFormService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cordinatorService: CordinatorService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    // this.Id = this.activatedRoute.snapshot.params['id'];
    this.editRecipientForm = this.formBuilder.group({
      participantId: ['', [Validators.required]],
      questionnaireid: [''],
      question: [],
      programId: ['', [Validators.required]],
      surveyId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      const base64Param: string | undefined = params['data'];

      if (base64Param) {
        // Decode the base64 parameter (assuming it's a valid base64 string)
        const decodedParam = atob(base64Param);
        const parsedData = JSON.parse(decodedParam) as {
          programId: number;
          surveyId: string;
          employeId: string;
        };

        this.programId = parsedData.programId;
        this.EmployeeId = parsedData.employeId;
        this.surveyId = parsedData.surveyId;
        console.log(parsedData);
        this.getValidServeyLnk();
      }
    });
  }

  optionValue(): FormArray {
    return this.editRecipientForm.get('optionName') as FormArray;
  }

  questionArray = Array(); // Initialize an empty array
  getCheckedValue(event: any) {
    //  let selectedOption = this.selectedOptions.map((item:any)=>{
    //   this.questionArray = Array();
    //   return  {questionId: item.questionId, answerId: item.Id }
    //  })
    if (event.inputvaluetypeId == '101') {
      this.questionsSeleted = {
        questionId: event.questionId,
        answerId: event.Id,
      };
      this.question.push(this.questionsSeleted);
    } else if (event.inputvaluetypeId == '102') {
      this.questionsSeleted = {
        questionId: event.questionId,
        answerId: event.Id,
      };
      this.question.push(this.questionsSeleted);
    } else if (event.inputvaluetypeId == '104') {
      console.log(this.selectedTextInputs);
      this.questionsSeleted = {
        questionId: event.questionId,
        answerId: event.Id,
        answer: this.selectedTextInputs[0],
      };
      this.question.push(this.questionsSeleted);
    }
    this.editRecipientForm.patchValue({
      question: this.question,
    });
    console.log(this.question);
  }

  getdetailservey() {
    // console.log(this.surveyId);
    // alert('');
    this.loader = true;
    this.optionListAtoZ = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let data = {
      id: this.surveyId,
    };
    this.cordinatorService.getByServeyId(data).subscribe((res: any) => {
      this.loader = false;
      this.details = res.data;
      this.SurveyDetils = this.details.question;
      return this.SurveyDetils.forEach((elements: any) => {
        this.selectedTextInputs.push();
      });
    });
  }

  onSubmit() {
    this.editRecipientForm.patchValue({
      participantId: this.EmployeeId,
      programId: this.programId,
      surveyId: this.surveyId,
    });
    if (this.editRecipientForm.valid) {
      this.thankyou = 1;
      console.log(this.editRecipientForm.value);
      this.answerService
        .postServeyAnswer(this.editRecipientForm.value)
        .subscribe({
          next: (result: any) => {
            console.log(result);
            this.toastService.showSuccess('Save Successfully.');
            // setTimeout(() => {
            //   this.router.navigateByUrl('/cordinator/SurveyManagement');
            // }, 2000);
          },
          error: (error) => {},
        });
    } else {
    }
  }

  postdetailsservey() {}

  getValidServeyLnk() {
    this.loader = true;
    let data: any = {};
    (data.programId = this.programId),
      (data.employeeId = this.EmployeeId),
      this.answerService.getValidedServeyLnk(data).subscribe({
        next: (res: any) => {
          this.loader = false;
          this.display = false;
          this.serveyLink = res.data[0];
          if (this.serveyLink.Result == true) {
            this.getdetailservey();
            this.displayAnwserForm = true;
          } else {
            this.displayAnwserForm = false;
          }
          console.log(this.serveyLink, 'this.serveyLink');
          // this.toastService.showSuccess('successfully.');
        },
        error: (error: any) => {
          this.loader = false;
        },
      });
  }
}
