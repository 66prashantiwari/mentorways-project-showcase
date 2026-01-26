import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorDashboardComponent } from './mentor-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
const routes: Routes = [
  {
    path: 'MentorDashboard',
    component: MentorDashboardComponent,
  },
];

@NgModule({
  declarations: [MentorDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InputSwitchModule,
    FormsModule,
    CalendarModule,
    FullCalendarModule,
    TableModule,
    InputMaskModule,
  ],
})
export class MentorDashboardModule {}
