import { SharedModule } from './../../../shared/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenteeDashboardComponent } from './mentee-dashboard.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
const routes: Routes = [
  {
    path: 'menteeDashboard',
    component: MenteeDashboardComponent,
  },
];

@NgModule({
  declarations: [MenteeDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CalendarModule,
    FullCalendarModule,
    FormsModule,
    TableModule,
    InputMaskModule,InputSwitchModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenteeDashboardModule {}
