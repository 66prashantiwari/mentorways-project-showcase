import { FormGroup, Validators, FormArrayName, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ToastService } from 'src/app/shared/dataService/toastService';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
forgotForm:FormGroup= new FormGroup({})
  constructor(private fb:FormBuilder, private authServiceService:AuthServiceService,private toastService: ToastService,) { }

  ngOnInit(): void {
    this.initializeForm()
  }
  initializeForm() {
    this.forgotForm = this.fb.group({
      email: [, [Validators.required, Validators.email,]],
    });
  }

  onSubmit(){
    if(this.forgotForm.valid){
      const params: any = {};
      params.email = this.forgotForm.value.email;
      this.authServiceService.forgetPassword(params).subscribe({
        next: (result)=>{
          console.log(result);
          this.toastService.showSuccess(result.message);
        },
        error: (error)=>{}
      })
    }
  }
}
