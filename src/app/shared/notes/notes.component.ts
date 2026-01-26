import { Component, Input, OnInit } from '@angular/core';
import { DocumentDialogService } from '../dataService/document-manger.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CordinatorService } from 'src/app/main/coordinator/coordinator-dashboard/coordinator-dashboard.service';
import { NotesService } from './notes.service';
import { ToastService } from '../dataService/toastService';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  @Input('programId') Id: any;
  shareShow: boolean = true;
  sharedDocumentNotes: boolean = false;
  notesForm: FormGroup;
  // roleForm: FormGroup;
  isInvalidForm: boolean = false;
  sharedDocument: boolean = false;
  accessList: any;
  loggedInUserrole: any;
  loginEmployeeId: any;
  notesList: any;
  id: any;
  accessName: any;
  noteId: any = 0;
  programDetails: any;
  menteeSurveyId: any;
  mentorSurveyId: any;
  feedback: any;
  loader: boolean = false;
  constructor(
    private documentDialogService: DocumentDialogService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cordinatorService: CordinatorService,
    private notesService: NotesService,
    private toastService: ToastService,
    private sharedServiceService: SharedServiceService
  ) {
    this.notesForm = this.formBuilder.group({
      selectedNotes: ['', [Validators.required]],
      selectedRole: ['', [Validators.required]],
    });
    this.Id = this.activatedRoute.snapshot.params['id'];
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
    this.sharedServiceService.getProgramdetails(this.Id).subscribe(
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

  getProgramParticipantList() {
    const params: any = {};
    params.programId = this.Id;
    this.cordinatorService.getProgramParticipantList(params).subscribe({
      next: (result: any) => {
        let currentUser = result.data.find((item: any) => {
          return item.employeId == this.loginEmployeeId;
        });
        if (currentUser) {
          this.loggedInUserrole = currentUser.attendeeRole;
          this.getNotesDetails();
        } else {
          this.loggedInUserrole = 0;
        }
      },
      error: (err) => {},
    });
  }

  getNotesDetails() {
    const params: any = {};
    params.programId = this.Id;
    params.employeeId = this.loginEmployeeId;
    params.employeeRoleId = this.loggedInUserrole;
    this.notesService.getProgramNotes(params).subscribe({
      next: (result: any) => {
        console.log(result, '//////////////////');
        this.notesList = result.data;
      },
      error: (error) => {},
    });
  }

  openDialog() {
    this.sharedDocumentNotes = true;
    this.getDocumentAccessList();
  }

  sharedDocumentToAny() {
    this.sharedDocument = true;
  }

  //Get Dacument Access List For All.
  getDocumentAccessList() {
    const params: any = {};
    this.documentDialogService.getDocumentAccessList(params).subscribe({
      next: (result: any) => {
        console.log(result);
        this.accessList = result.data.map((item: any) => {
          return { label: item.accessName, value: item.Id };
        });
      },
      error: (err) => {},
    });
  }

  cancelNotes() {
    this.sharedDocumentNotes = false;
  }

  onSubmitNotes() {
    if (this.notesForm.valid) {
      const params: any = {};
      params.programId = this.Id;
      params.employeeId = this.loginEmployeeId;
      params.accessId = this.notesForm.value.selectedRole;
      params.Id = this.noteId > 0 ? this.noteId : 0;
      params.notes = this.notesForm.value.selectedNotes;
      this.notesService.postProgramNotes(params).subscribe({
        next: (result: any) => {
          console.log(result);
          this.sharedDocumentNotes = false;
          this.getNotesDetails();
          this.toastService.showSuccess('Notes Created Successfully!');
        },
        error: (error) => {},
      });
    } else {
      this.isInvalidForm = true;
    }
  }

  deleteNotes(note: any) {
    const params: any = {};
    params.programId = note.programId;
    params.noteId = note.noteId;
    this.notesService.deleteProgramNote(params).subscribe({
      next: (result) => {
        console.log(result);
        this.toastService.showSuccess('Notes Deleted Successfully!');
        this.getNotesDetails();
      },
      error: () => {},
    });
  }

  edit(item: any) {
    this.noteId = item.noteId;
    this.sharedDocumentNotes = true;
    this.getDocumentAccessList();
    this.notesForm.controls['selectedNotes'].patchValue(item.notes);
    this.notesForm.get('selectedRole')?.patchValue(item.accessId);
  }

  cancel() {
    this.notesForm.reset();
  }
}
