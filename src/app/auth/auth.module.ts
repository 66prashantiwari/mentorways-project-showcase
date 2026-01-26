import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from '../shared/changepassword/changepassword.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },

      {
        path: 'forgot-password',
        component: ForgotpasswordComponent,
      },

      {
        path: 'sign-up',
        component: SignupComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    AuthComponent,
    ForgotpasswordComponent,
    SignupComponent,
    LoginComponent,
    ResetPasswordComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RadioButtonModule,
    NgxCaptchaModule,
    ToastModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
