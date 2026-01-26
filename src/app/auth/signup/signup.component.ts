import { ToastService } from './../../shared/dataService/toastService';
import { AuthServiceService } from './../auth-service.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signForm: FormGroup = new FormGroup({});
  display: boolean = true;
  selectedValue: any;
  verify: any;
  role: any;
  siteKey: any = '6LeRwk0gAAAAAP3rBC5O1KfqMdepTBlBh3rK8Ai7';
  role1: any;
  dis: any;
  token: any;
  tokensign: any;
  error: any = { errorMsg: '', showError: false };
  loader: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.signForm = this.fb.group({
      role: [, [Validators.required]],
      email: [, [Validators.required, Validators.email]],
      // password: [, [Validators.required]],
      cpassword: [, [Validators.required]],
      password: [
        ,
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
      recaptcha: [, [Validators.required]],
    });
  }

  comfirmPassword() {
    if (
      this.signForm.controls['password'].value ==
      this.signForm.controls['cpassword'].value
    ) {
      this.verify = 1;
    } else {
      this.verify = 0;
    }
  }
  change(event: any) {
    if (event.code == 'Backspace') {
      this.error.showError = false;
    }
  }
  verifyAccount() {
    this.loader = true;
    if (this.signForm.controls['email'].value) {
      let data = {
        email: this.signForm.controls['email'].value,
        accountId: 101,
      };
      this.authService.verify(data).subscribe(
        (res: any) => {
          this.loader = false;
          // console.log(res.data);
          this.display = false;
        },
        (error: any) => {
          this.loader = false;
          // this.toastService.showError('Something Is Wrong');
          if (error.status == 400 || error.status == 401) {
            this.error.errorMsg = error.error.error;
            this.error.showError = true;
          }
        }
      );
    } else {
      this.loader = false;
      this.signForm.controls['email'].markAllAsTouched();
    }
  }

  // this.display = true

  SignUpAccount() {
   
    // alert('function call')
    this.comfirmPassword();
    if (this.signForm.valid) {
      // alert('condition call')

      // alert(role)
      if (this.verify == 1) {
        // alert('api call')

        let data = {
          username: this.signForm.controls['email'].value,
          password: btoa(this.signForm.controls['password'].value),
          confirmPassword: btoa(this.signForm.controls['cpassword'].value),
          roleId: this.signForm.controls['role'].value,
          accountId: 101,
        };
        this.authService.signUp(data).subscribe((res: any) => {
          this.loader = false;
          this.toastService.showSuccess(
            'Registration successfully Please login.'
          );
          setTimeout(() => {
            this.router.navigateByUrl('/auth/login');
          }, 3000);
        });
      } else {
        this.loader = false;
        this.verify == 0;
      }
    } else {
      this.loader = false;
      // alert('failed')
      this.signForm.markAllAsTouched();
    }
  }

  handleReset() {
    this.signForm.controls['recaptcha'].setValue('');
  }
  handleExpire() {}
  handleLoad() {}
  handleSuccess(event: any) {
    this.signForm.controls['recaptcha'].setValue(event);
  }
}
