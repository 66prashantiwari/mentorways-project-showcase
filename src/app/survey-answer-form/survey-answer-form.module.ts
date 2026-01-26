import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyAnswerFormComponent } from './survey-answer-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
const routes: Routes = [
  {
    path: 'form',
    component: SurveyAnswerFormComponent,
  },
];

@NgModule({ 
  declarations: [SurveyAnswerFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    RadioButtonModule,
  ],
  exports: [RouterModule],
})
export class SurveyAnswerFormModule {}
