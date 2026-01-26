import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { ToastService } from 'src/app/shared/dataService/toastService';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  formValidate: boolean = false;
  code: any;
  resetPasswordLink: any;
  displayResetForm: boolean = false;
  thankyou: any = 0;
  constructor(
    private activatedRoute: ActivatedRoute,private fb:FormBuilder, 
    private authServiceService:AuthServiceService,private toastService: ToastService) { 
    this.resetForm = this.fb.group({
      newPassword: [, [Validators.required]],
      confirmPassword: [, [Validators.required]],
    });
    this.code = this.activatedRoute.snapshot.queryParams['code'];
  }

  ngOnInit(): void {
    if(this.code){
      this.getExpireResetPasswordLink();
    }
  }

  onSubmit(){
    if(this.resetForm.valid){
      this.thankyou = 1;
      const params: any = {};
      params.newPassword = this.resetForm.value.newPassword;
      params.confirmPassword = this.resetForm.value.confirmPassword;
      params.code = this.code;
      this.authServiceService.resetPassword(params).subscribe({
        next: (result:any)=>{
          this.toastService.showSuccess(result.message);
        },
        error: (error)=>{}
      })
    }else{
      this.formValidate = true;
    }
  }

  getExpireResetPasswordLink(){
    const params : any = {};
    params.code = this.code;
    this.authServiceService.expireResetPasswordLink(params).subscribe({
      next: (result)=>{
        console.log(result);
        this.resetPasswordLink = result.data[0];
        if (this.resetPasswordLink.Result == true) {
          this.displayResetForm = true;
        }else {
          this.displayResetForm = false;
        }
      },
      error:(error)=>{}
    })
  }

}
