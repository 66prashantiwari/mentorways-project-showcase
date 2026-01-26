import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CordinatorService } from '../coordinator-dashboard.service';
import { ToastService } from '../../../../shared/dataService/toastService';
@Component({
  selector: 'app-surveycreate',
  templateUrl: './surveycreate.component.html',
  styleUrls: ['./surveycreate.component.scss'],
})
export class SurveycreateComponent implements OnInit {
  loader: boolean = false;
  surveyForm: FormGroup;
  showField: any = '101';
  isInvalidForm: boolean = false;
  inputTypeSelect: any = [];
  selectedChoice: any;
  InputList: any;
  editId: any;
  editServeyList: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cordinatorService: CordinatorService
  ) {
    this.masterInputList();
    // this.optionForm  = this.formBuilder.group({
    //   questionOption:this.formBuilder.array([]),
    // })
    this.editId = this.activatedRoute.snapshot.params['id'];
    if (this.editId) {
      this.surveyForm = this.formBuilder.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        isMandatory: ['1'],
        weightage: ['1'],
        questionnaireId: [this.editId],
        question: this.formBuilder.array([this.newQuestions()]),
      });
    } else {
      this.surveyForm = this.formBuilder.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        isMandatory: ['1'],
        weightage: ['1'],
        question: this.formBuilder.array([this.newQuestions()]),
      });
    }
  }

  ngOnInit(): void {
    if (this.editId) {
      this.getEditServeyList();
    }
  }

  get getQuestion(): FormArray {
    return this.surveyForm.controls['question'] as FormArray;
  }

  newQuestions(i: number = 1): FormGroup {
    return this.formBuilder.group({
      questionvalue: ['', [Validators.required]],
      sequence: [i],
      inputType: ['101'],
      questionOption: this.formBuilder.array([this.newQuestionsOptions(101)]),
    });
  }

  addQuestion() {
    if (this.surveyForm.valid) {
      let sequence = this.surveyForm.controls['question'].value.length + 1;
      this.getQuestion.push(this.newQuestions(sequence));
    } else {
      this.isInvalidForm = true;
    }
  }

  removeQuestion(QuesIndex: number) {
    this.getQuestion.removeAt(QuesIndex);
  }

  newQuestionsOptions(inputType: any, i: number = 1): FormGroup {
    if (inputType == '104') {
      return this.formBuilder.group({
        optionsValue: [''],
        inputType: [inputType],
        Id: [0],
      });
    } else {
      return this.formBuilder.group({
        optionsValue: ['', [Validators.required]],
        inputType: [inputType],
        optionSequence: [i],
        Id: [0],
      });
    }
  }

  removeQuestionOption(i: any, j: number) {
    this.getQuestionsOptions(i).removeAt(j);
  }

  getQuestionsOptions(i: number) {
    return this.getQuestion.at(i).get('questionOption') as FormArray;
  }
  holdOldValue = [];
  SelectChoice(i: number, event: any) {
    //This code will Client requrement.
    const questionArray = this.surveyForm.get('question') as FormArray;
    const questionGroup = questionArray.at(i) as FormGroup;

    const questionOptionArray = questionGroup.get(
      'questionOption'
    ) as FormArray;

    this.holdOldValue = questionOptionArray.value;
    questionOptionArray.clear(); // This will remove all items from the questionOption array
    if (this.holdOldValue) {
      const questionOptionArray = (this.surveyForm.get('question') as FormArray).at(i)
        .get('questionOption') as FormArray;
      this.holdOldValue = this.holdOldValue.filter((item: any) => {
        if (item.inputType !== '' && event.value !== '104') {
          questionOptionArray.push(
            this.formBuilder.group({
              optionsValue: item.optionsValue,
              inputType: event.value,
              optionSequence: i+1,
              Id: item.id, // Assuming you want to set Id as 0
            })
          );
        }
      });
    }
    if (event.value == '104') {
      this.getQuestionsOptions(i).push(this.newQuestionsOptions(event.value));
    }

    console.log(this.getQuestion);
  }

  addQuestionsOptions(i: number, inputType: any) {
    const questionArray = this.surveyForm.get('question') as FormArray;
    const questionIndex = this.surveyForm.controls['question'].value.length - 1; // Replace with the actual index of the question you want to access

    const questionFormGroup = questionArray.at(questionIndex) as FormGroup;
    const questionOptionArray = questionFormGroup.get(
      'questionOption'
    ) as FormArray;
    let optionSequence = questionOptionArray.length + 1;
    this.getQuestionsOptions(i).push(
      this.newQuestionsOptions(inputType, optionSequence)
    );
  }

  masterInputList() {
    this.loader = true;
    let data = {};
    this.cordinatorService.getMasterInput(data).subscribe(
      (res: any) => {
        this.loader = false;
        this.InputList = res.data;
        console.log(this.InputList, 'this.getMasterInput');
      },
      (error: any) => {
        this.loader = false;
        this.toastService.showError('Something Is Wrong');
      }
    );
  }

  onSubmit() {
    this.loader = true;
    if (this.surveyForm.valid && !this.editId) {
      console.log(this.surveyForm.value);
      this.cordinatorService.postCreateServey(this.surveyForm.value).subscribe({
        next: (result: any) => {
          this.loader = false;
          console.log(result);
          this.toastService.showSuccess(result.message);
          setTimeout(() => {
            this.router.navigateByUrl('/cordinator/SurveyManagement');
          }, 2000);
        },
        error: (error) => {
          this.loader = false;
          this.toastService.showError('Something Is Wrong');
        },
      });
    } else {
      this.loader = false;
      this.isInvalidForm = true;
    }
  }

  getEditServeyList() {
    this.loader = true;
    const params: any = { id: this.editId };
    const questionArray = this.surveyForm.get('question') as FormArray;
    questionArray.clear();
    this.cordinatorService.getByServeyId(params).subscribe({
      next: (result: any) => {
        this.loader = false;
        console.log(result);
        this.editServeyList = result.data;
        this.surveyForm.patchValue({
          title: this.editServeyList.title,
          description: this.editServeyList.desc,
          questionnaireId: this.editId,
        });
        this.editServeyList.question.forEach((element: any, i: any) => {
          const questionFormGroup = this.formBuilder.group({
            questionvalue: element.question,
            sequence: i,
            inputType: element.inputType,
            questionOption: this.formBuilder.array([]),
          });
          const questionOptionArray = questionFormGroup.get(
            'questionOption'
          ) as FormArray;
          element.optionValue.forEach((option: any, i: any) => {
            questionOptionArray.push(
              this.formBuilder.group({
                optionsValue: option.optionName,
                Id: option.Id,
                optionSequence: i,
                inputType: option.inputvaluetypeId,
              })
            );
          });
          questionArray.push(questionFormGroup);
        });
        console.log(this.surveyForm.value);
      },
      error: (error) => {
        this.loader = false;
        this.toastService.showError('Something Is Wrong');
      },
    });
  }

  updateEditServey() {
    this.loader = true;
    console.log(this.surveyForm.value);
    if (this.surveyForm.valid && this.editId) {
      this.cordinatorService
        .updateCreateServey(this.surveyForm.value)
        .subscribe({
          next: (result: any) => {
            this.loader = false;
            this.toastService.showSuccess('Questionnaire successfully updated');
            setTimeout(() => {
              this.router.navigateByUrl('/cordinator/SurveyManagement');
            }, 2000);
          },
          error: (error) => {
            this.loader = false;
            this.toastService.showError('Something Is Wrong');
          },
        });
    } else {
      this.loader = false;
      this.isInvalidForm = true;
    }
  }
}
