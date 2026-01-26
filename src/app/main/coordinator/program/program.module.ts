import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponent } from './program.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ParticipateComponent } from './participate/participate.component';
import { MenteeMappingComponent } from './edit-mentor/mentee-mapping/mentee-mapping.component'
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ViewQuestionairaEmployeeListComponent } from './view-questionaira-employee-list/view-questionaira-employee-list.component';
import { ViewQuestionairaComponent } from './view-questionaira/view-questionaira.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { RunAlogorithmComponent } from './run-alogorithm/run-alogorithm.component';
import { AccordionModule } from 'primeng/accordion';

const routes: Routes = [
  {
    path: "program", component: ProgramComponent,

  },

{
  path: "Participate", component: ParticipateComponent
},
{
  path: "mapping/:id", component: MenteeMappingComponent
},
{
  path: "ViewQuestionairaEmployeeList/:id", component: ViewQuestionairaEmployeeListComponent
},
{
  path: "ViewQuestionaira/:id/:empId", component: ViewQuestionairaComponent
},
{
  path: "run-algorithm/:id" , component:RunAlogorithmComponent
}


];


@NgModule({
  declarations: [
    ProgramComponent,
    
    ParticipateComponent,
    MenteeMappingComponent,
    ViewQuestionairaEmployeeListComponent,
    ViewQuestionairaComponent,
    RunAlogorithmComponent
  ],
  imports: [
    FormsModule,
    DropdownModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TableModule,
    MultiSelectModule,
    AccordionModule

  ]
})
export class ProgramModule { }
