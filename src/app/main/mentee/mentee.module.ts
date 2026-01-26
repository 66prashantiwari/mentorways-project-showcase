import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenteeLayoutComponent } from './mentee-layout/mentee-layout.component';
import { ProgramDetailComponent } from './program-details/program-detail/program-detail.component';

// import { MenteeDashboardComponent } from './mentee-dashboard/mentee-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: MenteeLayoutComponent,
    children: [
      {
        path: 'mentee',
        loadChildren: () =>
          import('./mentee-dashboard/mentee-dashboard.module').then(
            (m) => m.MenteeDashboardModule
          ),
      },
      {
        path: 'mentee',
        loadChildren: () =>
          import('./mentee-program/mentee-program.module').then(
            (m) => m.MenteeProgramModule
          ),
      },
      {
        path: 'mentee',
        loadChildren: () =>
          import('./program-details/program-details.module').then(
            (m) => m.ProgramDetailsModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    MenteeLayoutComponent,
    // ProgramDetailComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    ],
})
export class MenteeModule { }
