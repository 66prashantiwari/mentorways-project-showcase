import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagementComponent } from './employee-management.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
const routes: Routes = [
  {
    path: 'EmployeeList',
    component: EmployeeListComponent,
  },
  {
    path: 'EmployeeDetails/:id',
    component: EmployeeDetailsComponent,
  },
  {
    path: 'EmployeeEdit/:id',
    component: EmployeeEditComponent,
  },
  {
    path: 'EmployeeProfile',
    component: EmployeeProfileComponent,
  },
];

@NgModule({
  declarations: [
    EmployeeManagementComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EmployeeEditComponent,
    EmployeeProfileComponent,
  ],
  imports: [
    TableModule,
    InputMaskModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DialogModule,
    ButtonModule, 
  ],
})
export class employeeManagementModule {}
