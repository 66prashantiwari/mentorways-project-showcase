import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponent } from './program.component';

const routes: Routes = [
    {
        path: "mentorProgram", component: ProgramComponent,
    
      },
        

];


@NgModule({
    declarations: [
    
        ProgramComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),

    ]
})
export class ProgramMentorModule { }
