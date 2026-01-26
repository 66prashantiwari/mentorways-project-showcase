import { ToastService } from './../dataService/toastService';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DocumentDialogService } from '../dataService/document-manger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loader: boolean = false;
  displayDocument: boolean = false;
  shareShow: boolean = false;
  loginDetails: any;
  constructor(
    private router: Router,
    private toastService: ToastService,
    private documentDialogService: DocumentDialogService
  ) {}

  ngOnInit(): void {
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
  }
  logout() {
    this.loader = true;
    localStorage.clear();
    this.toastService.showSuccess('Logout Successfully');

    setTimeout(() => {
      this.loader = false;
      this.router.navigateByUrl(`auth/login`);
    }, 2000);
  }

  openDialog() {
    this.displayDocument = true;
    // this.documentDialogService.showDialogSubject.next(true);
  }
}
