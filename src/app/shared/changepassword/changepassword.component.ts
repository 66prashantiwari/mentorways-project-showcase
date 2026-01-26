import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/dataService/toastService';
import { AuthServiceService } from '../../auth/auth-service.service';
import { environment } from 'src/environments/environment';
import { MainServiceService } from 'src/app/main/main-service.service';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent implements OnInit {
  loader: boolean = false;
  loginForm: FormGroup = new FormGroup({});
  siteKey: any;
  token: any;
  loginDetails: any = [];
  errorMessage: any;
  changePassword: any;
  newPassword: boolean = false;
  oldPassword: boolean = false;
  confirmPassword: boolean = false;
  validPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private toastService: ToastService,
    private mainService: MainServiceService,
    private sharedServiceService: SharedServiceService
  ) {
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
  }

  ngOnInit(): void {
    // this.siteKey = environment.siteKey;
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      oldPassword: [, [Validators.required]],
      newPassword: [
        ,
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
      // confirmPassword: [, [Validators.required]],
      confirmPassword: [
        ,
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
      // recaptcha: [, [Validators.required]],
    });
  }

  newPasswordVisibility() {
    this.newPassword = !this.newPassword;
  }

  oldPasswordVisibility() {
    this.oldPassword = !this.oldPassword;
  }

  confirmPasswordVisibility() {
    this.confirmPassword = !this.confirmPassword;
  }

  handleReset() {
    this.loginForm.controls['recaptcha'].setValue('');
  }
  handleExpire() {}
  handleLoad() {}
  handleSuccess(event: any) {
    this.loginForm.controls['recaptcha'].setValue(event);
  }

  loginAccount() {
    this.loader = true;
    if (
      this.loginForm.valid &&
      this.loginForm.controls['newPassword'].value ===
        this.loginForm.controls['confirmPassword'].value
    ) {
      let data = {
        oldPassword: btoa(this.loginForm.controls['oldPassword'].value),
        newPassword: btoa(this.loginForm.controls['newPassword'].value),
      };
      this.sharedServiceService.changePassword(data).subscribe(
        (res: any) => {
          alert();
          this.loader = false;
          this.changePassword = res.data;
          console.log(this.changePassword, 'this.changePassword');
          this.toastService.showSuccess('password change successfully');
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
        (error: any) => {
          this.loader = false;
          this.errorMessage = error.error.message;
          this.loginForm.markAllAsTouched();
        }
      );
    } else {
      this.loader = false;
      this.validPassword = true;
      this.loginForm.markAllAsTouched();
    }
  }
}
