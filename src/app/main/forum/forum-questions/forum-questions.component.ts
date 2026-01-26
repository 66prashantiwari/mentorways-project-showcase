import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainServiceService } from '../../main-service.service';
import { ToastService } from 'src/app/shared/dataService/toastService';

@Component({
  selector: 'app-forum-questions',
  templateUrl: './forum-questions.component.html',
  styleUrls: ['./forum-questions.component.scss'],
})
export class ForumQuestionsComponent implements OnInit {
  loginDetails: any;
  Id: any;
  loader: boolean = false;
  display: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private ToastService: ToastService,
    private mainService: MainServiceService
  ) {
    this.Id = this.activatedRoute.snapshot.params['id'];
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
    console.log(this.loginDetails);
  }

  ngOnInit(): void {}
}
