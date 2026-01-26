import { SharedServiceService } from './../shared-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorServiceService } from 'src/app/main/mentor/mentor-service.service';
import { CoordinatorServiceService } from 'src/app/main/coordinator/coordinator-service.service';
import { ToastService } from '../dataService/toastService';
@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.scss'],
})
export class EditProgramComponent implements OnInit {
  createProgramForm: FormGroup = new FormGroup({});
  surveylist: any;
  status: any;
  onEditData: any;
  editProgramData: any;
  editId: any;
  loader: boolean = false;
  surveyMenteeList: any;
  loginDetails: any = JSON.parse(localStorage.getItem('loginDetails') || '');
  programId: any;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedServiceService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private mentorServiceService: MentorServiceService,
    private chageDetecter: ChangeDetectorRef,
    private coordinatorServiceService: CoordinatorServiceService,
    private toasterService: ToastService
  ) {
    this.editId = this.activatedRoute.snapshot.params['id'];
    console.log(this.editId);
  }
  ngOnInit(): void {
    this.initialize();
    this.programStatus();
    this.getSurveyList();
    if (this.editId) {
      this.editProgram();
    }
  }

  editProgram() {
    this.mentorServiceService
      .getProgramListForCoordinator(this.editId)
      .subscribe({
        next: (result: any) => {
          console.log(result);
          this.editProgramData = result[0];
          this.programId = result[0].Id;
          this.createProgramForm.controls['programName'].setValue(
            this.editProgramData.name ?? ''
          ),
            this.createProgramForm.controls['shortDescription'].setValue(
              this.editProgramData.sort_desc ?? ''
            ),
            this.createProgramForm.controls['longDescription'].setValue(
              this.editProgramData.long_desc ?? ''
            ),
            //(formatDate(new Date(), "yyyy-MM-dd", "en")
            this.createProgramForm.controls['startDate'].setValue(
              this.editProgramData.startDate
                ? new Date(this.editProgramData.startDate)
                    .toISOString()
                    .substring(0, 10)
                : ''
            ),
            this.createProgramForm.controls['endDate'].setValue(
              this.editProgramData.endDate
                ? new Date(this.editProgramData.endDate)
                    .toISOString()
                    .substring(0, 10)
                : ''
            ),
            this.createProgramForm.controls['groupSize'].setValue(
              this.editProgramData.groupSize ?? ''
            ),
            this.createProgramForm.controls['status'].setValue(
              this.editProgramData.statusId ?? ''
            ),
            this.createProgramForm.controls['surveyMentee'].setValue(
              this.editProgramData.menteeSurveyId ?? ''
            );
          this.createProgramForm.controls['surveyMentor'].setValue(
            this.editProgramData.mentorSurveyId ?? ''
          );
          this.chageDetecter.detectChanges();
        },
        error: (error) => {
          this.toasterService.showError('Something Is Wrong');
        },
      });
  }

  initialize() {
    this.createProgramForm = this.fb.group({
      endDate: [, [Validators.required]],
      startDate: [, [Validators.required]],
      groupSize: [, [Validators.required]],
      longDescription: [, [Validators.required]],
      shortDescription: [, [Validators.required]],
      programName: [, [Validators.required]],
      status: [, [Validators.required]],
      surveyMentee: [, [Validators.required]],
      surveyMentor: [, [Validators.required]],
    });
  }

  createProgram() {
    this.loader = true;
    console.log(this.createProgramForm.controls);
    if (this.createProgramForm.valid) {
      let data = {
        programName: this.createProgramForm.controls['programName'].value,
        shortDesc: this.createProgramForm.controls['shortDescription'].value,
        longDesc: this.createProgramForm.controls['longDescription'].value,
        startDate: this.createProgramForm.controls['startDate'].value,
        endDate: this.createProgramForm.controls['endDate'].value,
        groupSize: this.createProgramForm.controls['groupSize'].value,
        statusId: this.createProgramForm.controls['status'].value,
        mentorSurveyId: parseInt(
          this.createProgramForm.controls['surveyMentor'].value
        ),
        menteeSurveyId: parseInt(
          this.createProgramForm.controls['surveyMentee'].value
        ),
        programId: this.programId ?? 0,
        cordinatorId: parseInt(this.loginDetails.userId),
      };

      this.sharedService.createProgram(data).subscribe(
        (res) => {
          this.loader = false;
          if (this.editId) {
            this.toasterService.showSuccess('Program successfully Updated');
          } else {
            this.toasterService.showSuccess('Program successfully Created');
          }

          if (res[0].Id) {
            this.editId = res[0].Id;
          }

          this.router.navigate(['cordinator/ProgramDetail/', this.editId]);
        },
        (error: any) => {
          this.loader = false;
          this.toasterService.showError('Something Is Wrong');
        }
      );
    } else {
      this.loader = false;
      this.createProgramForm.markAllAsTouched();
    }
  }

  // surveyList() {
  //   this.loader = true;
  //   let data = {};
  //   this.sharedService.getSurveyList(data).subscribe((res: any) => {
  //     this.loader = false;
  //     this.surveylist = res;
  //   });
  // }

  programStatus() {
    this.loader = true;
    let data = {};
    this.sharedService.getprogramStatus(data).subscribe(
      (res) => {
        this.loader = false;
        this.status = res;
      },
      (error: any) => {
        this.loader = false;
        this.toasterService.showError('Something Is Wrong');
      }
    );
  }

  getSurveyList() {
    this.loader = true;
    let data = { Id: 0 };
    this.coordinatorServiceService.getSurveyForQuestionnaire(data).subscribe(
      (res: any) => {
        this.surveyMenteeList = res.data;
        this.loader = false;
      },
      (error: any) => {
        this.loader = false;
        this.toasterService.showError('Something Is Wrong');
      }
    );
  }
}
