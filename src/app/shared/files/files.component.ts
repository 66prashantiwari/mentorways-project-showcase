import { Component, Input, OnInit } from '@angular/core';
import { DocumentDialogService } from '../dataService/document-manger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CordinatorService } from 'src/app/main/coordinator/coordinator-dashboard/coordinator-dashboard.service';
import { environment } from '../../../environments/environment';
import { ToastService } from '../dataService/toastService';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  // @Input('programId') Id: any;
  loggedInUserrole: any;
  loginEmployeeId: any;
  programList: any;
  imageUrl: any;
  displayDocument: boolean = false;
  shareShow: boolean = true;
  programId: any;
  programDetails: any;
  menteeSurveyId: any;
  mentorSurveyId: any;
  feedback: any;
  loader: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private documentDialogService: DocumentDialogService,
    private cordinatorService: CordinatorService,
    private router: Router,
    private toastService: ToastService,
    private sharedServiceService: SharedServiceService
  ) {
    this.imageUrl = environment.apiUrl;
    this.programId = this.activatedRoute.snapshot.params['id'];
    this.loginEmployeeId = JSON.parse(
      localStorage.getItem('loginDetails') || ''
    ).employeeId;
  }

  ngOnInit(): void {
    this.getProgramParticipantList();
    this.getProgramDetails();
  }

  getProgramDetails() {
    // console.log(this.Id);
    this.loader = true;
    this.sharedServiceService.getProgramdetails(this.programId).subscribe(
      (res) => {
        this.loader = false;
        this.programDetails = res[0];
        this.menteeSurveyId = this.programDetails.menteeSurveyId;
        this.mentorSurveyId = this.programDetails.mentorSurveyId;
        if (
          this.programDetails?.statusLabel == 'Completed' &&
          (this.loginEmployeeId.roleId == 102 ||
            this.loginEmployeeId.roleId == 103)
        ) {
          this.feedback = true;
        }
        console.log(this.programDetails, 'programDetails============');
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  openDialog() {
    this.displayDocument = true;
    // this.documentDialogService.showDialogSubject.next(true);
  }

  getProgramParticipantList() {
    const params: any = {};
    params.programId = this.programId;
    this.cordinatorService.getProgramParticipantList(params).subscribe({
      next: (result: any) => {
        let currentUser = result.data.find((item: any) => {
          return item.employeId == this.loginEmployeeId;
        });
        if (currentUser) {
          this.loggedInUserrole = currentUser.attendeeRole;
          this.getProgramDocument();
        } else {
          this.loggedInUserrole = 0;
        }
        console.log(
          this.loggedInUserrole,
          'part..............................',
          currentUser
        );
      },
      error: (err) => {},
    });
  }

  //GET PROGRAM FOR DOCUMENT SHOW.
  getProgramDocument() {
    const params: any = {};
    params.programId = this.programId;
    params.employeeId = this.loginEmployeeId;
    params.memberRoleId = this.loggedInUserrole;
    this.documentDialogService.getProgramDocument(params).subscribe({
      next: (result: any) => {
        console.log(result);
        this.programList = result.data;
      },
      error: (error) => {},
    });
  }
  // For Delete Doc.
  deleteDoc(doc: any) {
    const params: any = {};
    params.programId = this.programId;
    params.documentId = doc.Id;
    this.documentDialogService.deleteProgramDocument(params).subscribe({
      next: (result) => {
        console.log(result);
        this.toastService.showSuccess(result.data);
        this.getProgramDocument();
      },
      error: (error) => {},
    });
  }
}
