import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/dataService/toastService';
import { MainServiceService } from '../main-service.service';
import { ForumService } from './forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  createForm!: FormGroup;
  topic: any;
  description: any;
  loginDetails: any;
  Id: any;
  id: any;
  loader: boolean = false;
  display: boolean = false;
  forumlist: any;
  displaydelete: boolean = false;
  searchText: any;
  @ViewChild('dt1') table: any;
  constructor(
    private forumService: ForumService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private ToastService: ToastService,
    private mainService: MainServiceService,
    private router: Router
  ) {
    this.Id = this.activatedRoute.snapshot.params['id'];
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
    console.log(this.loginDetails);
  }

  ngOnInit(): void {
    this.getForumList();
    this.topicForm();
  }
  topicForm() {
    this.createForm = this.fb.group({
      topic: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  search($event: any) {
    this.table.filterGlobal($event.target.value, 'contains');
  }

  getForumList() {
    this.loader = true;
    let data = {};
    this.forumService.getForumList(data).subscribe(
      (res) => {
        this.loader = false;
        this.forumlist = res.data;
      },
      (error: any) => {
        this.loader = false;
        this.ToastService.showError('Something Is Wrong');
      }
    );
  }

  postForumList() {
    this.loader = true;
    if (this.createForm.valid) {
      console.log(this.createForm.valid, 'this.createForm.valid');
      let data = {
        topic: this.createForm.controls['topic'].value,
        description: this.createForm.controls['description'].value,
      };
      this.forumService.postForumList(data).subscribe(
        (res) => {
          this.loader = false;
          this.forumlist = res.data;
          this.display = false;
          this.getForumList();
          this.createForm.reset();
        },
        (error: any) => {
          this.loader = false;
          this.ToastService.showError('Something Is Wrong');
        }
      );
    } else {
      this.loader = false;
      this.createForm.markAllAsTouched();
    }
  }

  //For Delete Program.

  deletelist(item: any) {
    this.displaydelete = true;
    this.id = item.Id;
  }
  deleteForum() {
    console.log(this.id, 'this.id');
    this.loader = true;
    let params = {
      id: this.id,
    };
    this.forumService.deleteForum(params).subscribe({
      next: (result: any) => {
        this.loader = false;
        this.displaydelete = false;
        this.ToastService.showSuccess('Survey deleted successfully.');
        this.getForumList();
      },
      error: (error: any) => {
        this.displaydelete = false;
        this.loader = false;
        this.ToastService.showError('Something Is Wrong');
      },
    });
  }
  //Edit A Program.
}
