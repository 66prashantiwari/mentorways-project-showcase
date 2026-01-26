import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyprofileComponent } from './myprofile.component';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
    {
        path: "Myprofile", component: MyprofileComponent,
    
      },
];


@NgModule({
    declarations: [
        MyprofileComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RouterModule.forChild(routes),

    ]
})
export class MyProfileModule { }
