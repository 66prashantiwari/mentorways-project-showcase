import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoordinatorLayoutComponent } from './coordinator-layout/coordinator-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: CoordinatorLayoutComponent,
    children: [
      {
        path: 'cordinator', 
        loadChildren: () => 
          import('./coordinator-dashboard/coordinator-dashboard.module').then(
            (m) => m.coordinatorDashboardModule
          ),
      },
      {
        path: 'cordinator',
        loadChildren: () =>
          import('./employee-management/employee-management.module').then(
            (m) => m.employeeManagementModule
          ),
      },
      {
        path: 'cordinator',
        loadChildren: () =>
          import('./program/program.module').then((m) => m.ProgramModule),
      },
    ],
  },

];

@NgModule({
  declarations: [CoordinatorLayoutComponent, PageNotFoundComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class CoordinatorModule {}
