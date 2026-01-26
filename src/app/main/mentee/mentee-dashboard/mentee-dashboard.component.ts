import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MentorServiceService } from '../../mentor/mentor-service.service';
import { ToastService } from 'src/app/shared/dataService/toastService';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from '../../main-service.service';
import { DatePipe } from '@angular/common';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mentee-dashboard',
  templateUrl: './mentee-dashboard.component.html',
  styleUrls: ['./mentee-dashboard.component.scss'],
  providers: [DatePipe],
})
export class MenteeDashboardComponent implements OnInit {
  // @ViewChild('calendar') calendar: Calendar;
  loader: boolean = false;
  programlist: any;
  dashboardCount: any;
  loginDetails: any;
  Id: any;
  menteeId: any;
  mentorId: any;
  myDate: any;
  lastWeakDate: any;
  //Clender variabls.
  todayDateTarget: Date = new Date(); // Initialize with the current date and time
  dateData: any = [];
  weekTarget: Date[] = [];
  weekTarget1: any = [];
  todayRatetVisible: boolean = false;
  isCalendarOpen = false;
  roleId: any;
  todayRatetVisibles: boolean = false;
  todayTarget: any;
  checked1: boolean = false;

  constructor(
    private mentorServiceService: MentorServiceService,
    private toasterService: ToastService,
    private router: Router,
    private changeDetectRef: ChangeDetectorRef,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private mainServiceService: MainServiceService,
    private fb: FormBuilder
  ) {
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
  }

  ngOnInit(): void {
    if (this.loginDetails.roleId == 103) {
      this.menteeId = this.loginDetails.userId;
      this.mentorId = 0;
    } else if (this.loginDetails.roleId == 102) {
      this.menteeId = 0;
      this.mentorId = this.loginDetails.userId;
    }

    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.lastWeakDate = this.datePipe.transform(
      this.getLastWeeksDate(),
      'yyyy-MM-dd'
    );
    this.viewCalender();
    this.getProgramList();
    this.getDashbordCount();
    this.getAppoinments();
    this.getAppoinmentsWeaks();
  }

  handleSwitchRole(event: any) {
    const storedLoginDetails = JSON.parse(
      localStorage.getItem('loginDetails')!
    );
    if (storedLoginDetails) {
      storedLoginDetails.roleId = '102';
      localStorage.setItem('loginDetails', JSON.stringify(storedLoginDetails));
      this.router.navigateByUrl('mentor/MentorDashboard');
    }
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  getLastWeeksDate() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
  }

  getProgramList() {
    this.loader = true;
    let data = {
      userId: this.loginDetails.employeeId,
      roleId: this.loginDetails.roleId,
    };
    this.mentorServiceService.getPrgramForMentorMentee(data).subscribe(
      (res) => {
        this.loader = false;
        this.programlist = res.reverse();
        console.log(this.programlist, '=====programlist=======');
      },
      (error: any) => {
        this.loader = false;
        this.toasterService.showError('Something Is Wrong');
      }
    );
  }

  ProgramDetail(program: any) {
    if (this.loginDetails.roleId == '101') {
      this.router.navigate(['/shared/ProgramDetail/', program.Id]);
    } else {
      this.router.navigate(['/mentee/ProgramDetail/', program.programId]);
    }
    this.changeDetectRef.detectChanges();
  }

  getDashbordCount() {
    const params: any = {
      employeeId: this.loginDetails.employeeId,
      roleId: this.loginDetails.roleId,
    };
    this.mentorServiceService.getDashbordCountMentee(params).subscribe({
      next: (result: any) => {
        console.log(result);
        this.dashboardCount = result.data;
      },
      error: (error) => {},
    });
  }

  getAppoinments() {
    const params: any = {};
    params.mentorId = this.mentorId;
    params.menteeId = this.menteeId;
    params.startDate = this.myDate;
    params.endDate = this.myDate;
    this.mainServiceService.getAppoinments(params).subscribe({
      next: (result) => {
        this.todayTarget = result.data;
        this.todayRatetVisibles = true;
        console.log(this.todayTarget, 'this.todayTarget');
      },
      error: (error) => {},
    });
  }

  getAppoinmentsWeaks() {
    const params: any = {};
    params.mentorId = this.mentorId;
    params.menteeId = this.menteeId;
    params.startDate = this.myDate;
    params.endDate = this.lastWeakDate;
    this.mainServiceService.getAppoinments(params).subscribe({
      next: (result) => {
        this.weekTarget1 = result.data;
        // this.todayRatetVisible = true;
        // this.weekTarget1.forEach((dateObj:any) => {
        //   this.weekTarget.push(new Date(dateObj.startTime));
        // });
        // this.changeDetectRef.detectChanges();
        // console.log(this.weekTarget, 'weekTarget');
        if (this.weekTarget1.length > 0) {
          this.todayRatetVisible = true;
        }
      },
      error: (error) => {},
    });
  }

  getLastWeeksMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }
  calendarVisible = true;
  calendarData: any;
  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [
      // dayGridPlugin, timeGridPlugin
      dayGridPlugin,
      timeGridPlugin,
      resourceTimelinePlugin,
    ],
    // schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    displayEventTime: true,
    initialDate: new Date().toISOString().split('T')[0],
    contentHeight: 'auto',
    initialView: 'dayGridMonth',

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '',
    },
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    selectable: true,
    nowIndicator: true,
    selectMirror: true,
    dayMaxEvents: 3,
    events: this.Events[0],
    timeZone: 'UTC',
    eventClick: (events) => {},
  };
  viewCalender() {
    this.loader = true;

    let data = {
      mentorId: this.mentorId,
      menteeId: this.menteeId,
      startDate: this.myDate,
      endDate: this.lastWeakDate,
    };
    this.mainServiceService.getAppoinments(data).subscribe((res: any) => {
      this.loader = false;
      this.calendarData = res.data;
      this.Events.push(res.data);
      console.log(this.calendarData, 'calendardata=================');
      let x = new Date();
      this.calendarOptions.events = this.calendarData.map((el: any) => ({
        ...el,
        title:
          el.startTime +
          '/' +
          el.firstName +
          '/' +
          el.lastName +
          '/' +
          el.appointmentStatusId +
          '/' +
          el.programName +
          '/' +
          el.programId,
        date: el.startTime,
      }));
      console.log(this.calendarOptions.events, '//////////////////////////');
    });
  }
}
