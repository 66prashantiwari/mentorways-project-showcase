import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Loginguard } from './shared/dataService/AuthGuardService';
import { Routerguard } from './shared/dataService/MainModuleGuardService';
import { SurveyAnswerFormModule } from './survey-answer-form/survey-answer-form.module';
import { PageNotFoundComponent } from './main/coordinator/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'auth/login', pathMatch: 'full',
  },
  
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // canActivateChild:[Loginguard]
  },

  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    // canActivateChild: [Routerguard],
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
      // canActivateChild: [Routerguard],
  },
  {
    path: 'Survey',
    loadChildren: () =>
      import('./survey-answer-form/survey-answer-form.module').then(
        (m) => m.SurveyAnswerFormModule),
  },
  {
    path: '**', component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
