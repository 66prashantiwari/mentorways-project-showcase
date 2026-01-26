import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RadioButtonModule } from 'primeng/radiobutton';

const routes: Routes = [
  {
    path: 'program-details/:id',
    component: ProgramDetailComponent,
  },
];
@NgModule({
  declarations: [ProgramDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    RadioButtonModule,
  ],
})
export class ProgramDetailsModule {}
