import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentDialogService } from 'src/app/shared/dataService/document-manger.service';
import { ToastService } from 'src/app/shared/dataService/toastService';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { environment } from 'src/environments/environment';
import { CordinatorService } from '../coordinator/coordinator-dashboard/coordinator-dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-drive',
  templateUrl: './my-drive.component.html',
  styleUrls: ['./my-drive.component.scss'],
})
export class MyDriveComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  displayDocument: boolean = false;
  loader: boolean = false;
  selectedFile: any;
  showFilesData: any;
  selectedValues: any;
  sharedDocument: boolean = false;
  vendor: any;
  accessList: any;
  documentIds: any = [];
  programId: any;
  roleForm: FormGroup;
  uploadForm: FormGroup;
  isInvalidForm: boolean = false;
  sharedDocumentNotes: boolean = false;
  id: any;
  display: boolean = false;
  @Input('DisplayDocument') displayDocumentHide: any;
  @Input('ShareShow') shareShow: any;
  @Input('ProgramId') programIds: any;
  uploadDoc: boolean = false;
  showFileNameMsg: boolean = false;

  @Output('hide') hide = new EventEmitter();
  @Output('getProgramDocument') getProgramDocument = new EventEmitter();
  loginEmployeeId: any;
  file: any;
  fileName: any;
  docFileName: any = '';
  loginDetails: any;
  imageUrl: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private documentDialogService: DocumentDialogService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.imageUrl = environment.apiUrl;
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
    console.log(this.loginDetails);

    this.programId = this.activatedRoute.snapshot.params['id'];
    this.roleForm = this.formBuilder.group({
      selectedRole: ['', [Validators.required]],
    });
    this.uploadForm = this.formBuilder.group({
      fileName: ['', [Validators.required]],
    });
    this.loginEmployeeId = JSON.parse(
      localStorage.getItem('loginDetails') || ''
    ).employeeId;
  }

  ngOnInit(): void {
    this.getDocument();
  }

  ngOnChanges() {
    this.getDocument();
  }

  cancel() {
    this.hide.emit(false);
    this.displayDocumentHide = false;
    this.selectedValues = '';
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  getDocument() {
    // this.display = true;
    const params: any = {};
    this.documentDialogService.getUserDocument(params).subscribe({
      next: (result) => {
        console.log(result);
        // this.display = false;
        this.showFilesData = result.data;
        console.log(this.showFilesData);
      },
      error: (error) => {
        // this.display = false;
      },
    });
  }

  sharedDocumentToAny() {
    if (this.selectedValues.length > 0) {
      this.sharedDocument = true;
      this.selectedValues = this.selectedValues;
      this.getDocumentAccessList();
    } else {
      this.toastService.showWarn('Please select at least one document!');
    }
  }

  //Get Dacument Access List For All.
  getDocumentAccessList() {
    // this.loader = true;
    const params: any = {};
    this.documentDialogService.getDocumentAccessList(params).subscribe({
      next: (result: any) => {
        // this.loader = false;
        // console.log(result);
        this.accessList = result.data.map((item: any) => {
          return { label: item.accessName, value: item.Id };
        });
      },
      error: (err) => {
        // this.loader = false;
      },
    });
  }

  sharedDoc(event: any) {
    // this.display = true;
    this.documentIds.push(this.selectedValues);
    console.log(this.documentIds);
  }

  onSubmit() {
    // this.display = true;011
    if (this.roleForm.valid) {
      const params: any = {};
      params.programId = this.programId;
      params.accessId = this.roleForm.value.selectedRole;
      params.employeeId = this.loginEmployeeId;
      params.documentIds = this.selectedValues.toString();
      this.documentDialogService.shareProgramDocument(params).subscribe({
        next: (result: any) => {
          // this.display = false;
          this.toastService.showSuccess('Response Send Successfully!');
          this.getProgramDocument.emit(true);
          this.sharedDocument = false;
          this.displayDocumentHide = false;
        },
        error: (err) => {
          // this.display = false;
        },
      });
    } else {
      // this.display = false;
      this.isInvalidForm = true;
    }
  }

  // For Delete Doc.

  deletelist(doc: any) {
    this.display = true;
    this.id = doc.doc_id;
  }

  deleteDocument() {
    const params: any = {};
    params.documentId = this.id;
    this.documentDialogService.deleteDocument(params).subscribe({
      next: (result) => {
        this.toastService.showSuccess(result.data);
        this.display = false;
        this.getDocument();
      },
      error: (error) => {},
    });
  }
  openPopup() {
    this.uploadDoc = true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.docFileName = file.name;

    this.file = event.target.files[0];
  }
  onSubmitDoc() {
    this.loader = true;
    if (this.uploadForm.valid) {
      this.fileName = this.uploadForm.value.fileName;
      let formData: FormData = new FormData();
      formData.append('file', this.file);
      formData.append('filename', this.fileName);
      this.documentDialogService.uploadDocument(formData).subscribe({
        next: (result: any) => {
          this.loader = false;
          this.toastService.showSuccess('file Successfully Uploded!');
          this.uploadDoc = false;
          this.getDocument();
          this.uploadForm.reset();
          this.file = '';
          this.docFileName = '';
        },
        error: (error) => {
          this.loader = false;
          this.showFileNameMsg = true;
          // this.toastService.showError(
          //   'File name is not found. Please upload file'
          // );
        },
      });
    } else {
      this.isInvalidForm = true;
    }
  }
}
