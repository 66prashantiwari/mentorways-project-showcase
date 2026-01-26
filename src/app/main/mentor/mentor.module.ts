import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MentorLayoutComponent } from './mentor-layout/mentor-layout.component';
import { MenteeMentorguard } from 'src/app/shared/dataService/mentor-mentee-AuthGuardService';

// import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: MentorLayoutComponent,
    children: [
      {
        path: 'mentor',
        loadChildren: () =>
          import('./mentor-dashboard/mentor-dashboard.module').then((m) => m.MentorDashboardModule),
          canActivate:[MenteeMentorguard]
      },
      {
        path: 'mentor',
        loadChildren: () =>
          import('./program/programMentor.module').then(
            (m) => m.ProgramMentorModule
          ),
      },

      {
        path: 'mentor',
        loadChildren: () =>
          import('./program-details/program-details.module').then(
            (m) => m.ProgramDetailsModule
          ),
      },
      {
        path: 'mentor',
        loadChildren: () =>
          import('./myprofile/myprofile.module').then((m) => m.MyProfileModule),
      },
    ],
  },
];

@NgModule({
  declarations: [MentorLayoutComponent],
  imports: [
     RouterModule.forChild(routes),
     CommonModule,
     SharedModule,]

})
export class MentorModule { }
