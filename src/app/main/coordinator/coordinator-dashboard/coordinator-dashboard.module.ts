import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoordinatorDashboardComponent } from './coordinator-dashboard.component';
import { ChartModule } from 'primeng/chart';
import { SurveyManagementComponent } from './survey-management/survey-management.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { SurveyViewComponent } from './survey-view/survey-view.component';
import { SurveycreateComponent } from './surveycreate/surveycreate.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';

const routes: Routes = [ 
  {
    path: 'CoordinatorDashboard',
    component: CoordinatorDashboardComponent, 
  },
  {
    path: 'SurveyManagement',
    component: SurveyManagementComponent,
  },
  {
    path: 'SurveyView',
    component: SurveyViewComponent,
  },
  {
    path: 'Surveycreate',
    component: SurveycreateComponent,
  },
  {
    path: 'SurveyEdit/:id',
    component: SurveycreateComponent,
  },
  {
    path: 'Surveydetails/:id',
    component: SurveyDetailsComponent,
  },
  {
    path: 'Add-participant/:id',
    component: AddParticipantComponent
  }
];

@NgModule({
  declarations: [
    CoordinatorDashboardComponent,
    SurveyManagementComponent,
    SurveyDetailsComponent,
    SurveyViewComponent,
    SurveycreateComponent,
    AddParticipantComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RadioButtonModule,
    CommonModule,
    SharedModule,
    ChartModule,
    InputMaskModule,
    DropdownModule,
    RouterModule.forChild(routes),
    DialogModule,
    ButtonModule,
    TableModule,
    AutoCompleteModule,TooltipModule,MultiSelectModule
  ],
})
export class coordinatorDashboardModule {}
