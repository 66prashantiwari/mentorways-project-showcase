import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase/purchase.component';
import { AboutComponent } from './about/about.component';
import { SupportComponent } from './support/support.component';
import { ManageComponent } from './manage.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'about',component: AboutComponent,
    },
    {
        path: 'support',component: SupportComponent,
    },
    {
        path: 'purchase',component: PurchaseComponent,
    }
  
   
  ];


@NgModule({
  declarations: [
    PurchaseComponent,
    AboutComponent,
    SupportComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class ManageModule { }
