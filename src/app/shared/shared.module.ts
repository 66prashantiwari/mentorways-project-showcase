import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SharedComponent } from './shared.component';
import { MentorHeaderComponent } from './mentor-header/mentor-header.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { AllprogramComponent } from './allprogram/allprogram.component';
import { NotesComponent } from './notes/notes.component';
import { FilesComponent } from './files/files.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { MentorListComponent } from './mentor-list/mentor-list.component';
import { MenteeListComponent } from './mentee-list/mentee-list.component';
import { CreatesessionComponent } from './createsession/createsession.component';
import { SessionDetialsComponent } from './session-detials/session-detials.component';
import { MenteeHeaderComponent } from './mentee-header/mentee-header.component';
import { CarouselModule } from 'primeng/carousel';
import { ExcelImportComponent } from './excel-import/excel-import.component';
import { FileUploadModule } from 'primeng/fileupload';
// import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ExcelExportComponent } from './excel-export/excel-export.component';
// import { HTTPInterceptor } from './dataService/httpIntercepter';
import { DropdownModule } from 'primeng/dropdown';
// import { TooltipModule } from 'ng2-tooltip-directive';
import { RatingModule } from 'primeng/rating';
import { LoaderComponent } from './loader/loader.component';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DocumentMangerComponent } from './document-manger/document-manger.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule } from 'primeng/calendar';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { NgxCaptchaModule } from 'ngx-captcha';

const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: 'header',
        component: HeaderComponent,
      },
      {
        path: 'footer',
        component: FooterComponent,
      },
      {
        path: 'MentorHeader',
        component: MentorHeaderComponent,
      },
      {
        path: 'MenteeHeader',
        component: MentorHeaderComponent,
      },
      {
        path: 'ProgramList',
        component: ProgramListComponent,
      },
      {
        path: 'ProgramDetail/:id',
        component: ProgramDetailComponent,
      },
      {
        path: 'Allprogram',
        component: AllprogramComponent,
      },
      {
        path: 'CreateProgram',
        component: EditProgramComponent,
      },
      {
        path: 'EditProgram/:id',
        component: EditProgramComponent,
      },
      {
        path: 'MentorList',
        component: MentorListComponent,
      },
      {
        path: 'MenteeList',
        component: MenteeListComponent,
      },
      {
        path: 'files',
        component: FilesComponent,
      },
      {
        path: 'notes',
        component: NotesComponent,
      },
      {
        path: 'createSession',
        component: CreatesessionComponent,
      },
      {
        path: 'SessionDetials',
        component: SessionDetialsComponent,
      },
      {
        path: 'ExcelImport',
        component: ExcelImportComponent,
      },
      {
        path: 'ExcelExport',
        component: ExcelExportComponent,
      },
      {
        path: 'Calendar',
        component: CalendarComponent,
      },
    ],
  },
  {
    path: 'change-password',
    component: ChangepasswordComponent,
  },
];

@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    FooterComponent,
    MentorHeaderComponent,
    ProgramListComponent,
    ProgramDetailComponent,
    ProgramListComponent,
    AllprogramComponent,
    EditProgramComponent,
    MentorListComponent,
    MenteeListComponent,
    FilesComponent,
    NotesComponent,
    CreatesessionComponent,
    SessionDetialsComponent,
    MenteeHeaderComponent,
    ExcelImportComponent,
    ExcelExportComponent,
    LoaderComponent,
    DocumentMangerComponent,
    CalendarComponent,
    ChangepasswordComponent,
  ],
  imports: [
    FileUploadModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    RatingModule,
    RouterModule,
    DialogModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    AutoCompleteModule,
    RadioButtonModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    TooltipModule,
    VirtualScrollerModule,
    FullCalendarModule,
    CalendarModule,
    RatingModule,
    NgxCaptchaModule,
  ],
  exports: [
    SharedComponent,
    HeaderComponent,
    FooterComponent,
    MentorHeaderComponent,
    ProgramListComponent,
    ProgramDetailComponent,
    ProgramListComponent,
    AllprogramComponent,
    EditProgramComponent,
    MentorListComponent,
    MenteeListComponent,
    FilesComponent,
    NotesComponent,
    CreatesessionComponent,
    SessionDetialsComponent,
    MenteeHeaderComponent,
    ExcelImportComponent,
    ExcelExportComponent,
    LoaderComponent,
    DocumentMangerComponent,
    CalendarComponent,
    ChangepasswordComponent,
  ],
})
export class SharedModule {}
