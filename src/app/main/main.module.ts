import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { TableModule } from 'primeng/table';
import { MyDriveComponent } from './my-drive/my-drive.component';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpolyeeProfileComponent } from './empolyee-profile/empolyee-profile.component';
// import { MenteeMentorguard } from 'src/app/shared/dataService/mentor-mentee-AuthGuardService';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'mydrive',
    component: MyDriveComponent,
  },
  {
    path: 'profile',
    component: EmpolyeeProfileComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./coordinator/coordinator.module').then(
        (m) => m.CoordinatorModule
      ),
    // canActivate:[MenteeMentorguard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./manage/manage.module').then((m) => m.ManageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./mentor/mentor.module').then((m) => m.MentorModule),
    // canActivate:[MenteeMentorguard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./mentee/mentee.module').then((m) => m.MenteeModule),
    // canActivate:[MenteeMentorguard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./forum/forum.module').then((m) => m.ForumModule),
  },
];

@NgModule({
  declarations: [MainComponent, FeedbackComponent, MyDriveComponent, EmpolyeeProfileComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    TableModule,
    DialogModule,
    CheckboxModule,
    TooltipModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class MainModule {}
