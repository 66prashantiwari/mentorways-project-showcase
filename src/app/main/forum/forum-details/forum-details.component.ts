import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainServiceService } from '../../main-service.service';
import { ToastService } from 'src/app/shared/dataService/toastService';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.scss'],
})
export class ForumDetailsComponent implements OnInit {
  createForm!: FormGroup;
  loginDetails: any;
  Id: any;
  loader: boolean = false;
  display: boolean = false;
  forumDetails: any;
  topicComment: any;
  forumTopicDetails: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private ToastService: ToastService,
    private mainService: MainServiceService,
    private forumService: ForumService
  ) {
    this.Id = this.activatedRoute.snapshot.params['id'];
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
    console.log(this.loginDetails);
  }

  ngOnInit(): void {
    this.getForumDetails();
    this.topicForm();
  }

  topicForm() {
    this.createForm = this.fb.group({
      comment: ['', [Validators.required]],
      // description: ['', [Validators.required]],
    });
  }

  getForumDetails() {
    this.loader = true;
    let data = {
      id: this.Id,
    };
    this.forumService.getForumDetails(data).subscribe(
      (res) => {
        this.loader = false;
        this.forumDetails = res.data;
        this.forumTopicDetails = res.data[0];
        console.log(this.forumDetails, 'this.forumDetails');
        console.log(this.forumTopicDetails, 'this.forumTopicDetails');
      },
      (error: any) => {
        this.loader = false;
        this.ToastService.showError('Something Is Wrong');
      }
    );
  }

  postTopicComment() {
    this.loader = true;
    if (this.createForm.valid) {
      console.log(this.createForm.valid, 'this.createForm.valid'); 
      let data = {
        topicId: this.Id,
        comment: this.createForm.controls['comment'].value,
        loggedInUserId: 0,
        replyId: 0,
      };
      this.forumService.postTopicComment(data).subscribe(
        (res) => {
          this.loader = false;
          this.topicComment = res.data;
          this.display = false;
          this.getForumDetails();
          this.createForm.reset();
          console.log(this.topicComment, 'this.topicComment');
        },
        (error: any) => {
          this.loader = false;
          this.ToastService.showError('Something Is Wrong');
        }
      );
    }
  }
}
