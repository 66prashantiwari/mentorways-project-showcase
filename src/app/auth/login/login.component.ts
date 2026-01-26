import { ToastService } from './../../shared/dataService/toastService';
import { Router } from '@angular/router';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loader: boolean = false;
  loginForm: FormGroup = new FormGroup({});

  siteKey: any;
  token: any;
  loginDetails: any = [];
  errorMessage: any;
  newPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.siteKey = environment.siteKey;
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required]],
      // password: [, [Validators.required,Validators.pattern(
      //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      // )]],
      recaptcha: [, [Validators.required]],
    });
  }

  newPasswordVisibility() {
    this.newPassword = !this.newPassword;
  }

  loginAccount() {
    this.loader = true;
    if (this.loginForm.valid) {
      let data = {
        userName: this.loginForm.controls['email'].value,
        password: btoa(this.loginForm.controls['password'].value),
        clientIPAddress: '0.17822789966552',
      };
      this.authService.login(data).subscribe({
        next: (res: any) => {
          this.loader = false;
          this.loginDetails = res.data;
          this.token = res.token;
          console.log(this.token);
          localStorage.setItem('token', this.token);
          localStorage.setItem(
            'loginDetails',
            JSON.stringify(this.loginDetails)
          );
          // this.toastService.showSuccess('Login Successfully');
          if (this.loginDetails.roleId == 101) {
            this.loader = false;
            this.router.navigateByUrl('/cordinator/CoordinatorDashboard');
          } else if (this.loginDetails.roleId == 102) {
            this.loader = false;
            this.router.navigateByUrl('/mentor/MentorDashboard');
          } else if (this.loginDetails.roleId == 103) {
            this.loader = false;
            this.router.navigateByUrl('/mentee/menteeDashboard');
          } else {
            this.loginForm.markAllAsTouched();
          }
        },
        error: (error) => {
          this.loader = false;
          this.errorMessage = error.error.message;
          this.loginForm.markAllAsTouched();
        },
      });
      // this.authService.login(data).subscribe((res: any) => {
      //   this.loader = false;
      //   this.loginDetails = res.data;
      //   this.token = res.token;
      //   console.log(this.token);
      //   localStorage.setItem('token', this.token);
      //   localStorage.setItem('loginDetails', JSON.stringify(this.loginDetails));
      //   // this.toastService.showSuccess('Login Successfully');
      //   if (this.loginDetails.roleId == 101) {
      //     this.loader = false;
      //     this.router.navigateByUrl('/cordinator/CoordinatorDashboard');
      //   } else if (this.loginDetails.roleId == 102) {
      //     this.loader = false;
      //     this.router.navigateByUrl('/mentor/MentorDashboard');
      //   } else if (this.loginDetails.roleId == 103) {
      //     this.loader = false;
      //     this.router.navigateByUrl('/mentee/menteeDashboard');
      //   }
      // });
    } else {
      this.loader = false;
      this.loginForm.markAllAsTouched();
    }
  }

  handleReset() {
    this.loginForm.controls['recaptcha'].setValue('');
  }
  handleExpire() {}
  handleLoad() {}
  handleSuccess(event: any) {
    this.loginForm.controls['recaptcha'].setValue(event);
  }
}
