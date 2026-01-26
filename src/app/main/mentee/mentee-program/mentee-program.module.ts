import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenteeProgramComponent } from './mentee-program.component';

const routes: Routes = [
    {
        path: 'MenteeProgram',component: MenteeProgramComponent,
    }
  
   
  ];


@NgModule({
    declarations: [
        MenteeProgramComponent
        
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),

    ]
})
export class MenteeProgramModule { }
