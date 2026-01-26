import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { SharedServiceService } from '../shared-service.service';
import { MainServiceService } from 'src/app/main/main-service.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe],
})
export class CalendarComponent implements OnInit {
  startDate: any;
  endDate: any;
  currentDate: any;
  loader: boolean = false;
  loginDetails: any;
  menteeId: any;
  mentorId: any;
  myDate: any;
  lastWeakDate: any;
  lastWeakMonth: any;
  //Clender variabls.
  todayDateTarget: Date = new Date(); // Initialize with the current date and time
  constructor(
    private fb: FormBuilder,
    private sharedServiceService: SharedServiceService,
    private mainServiceService: MainServiceService,
    private datePipe: DatePipe
  ) {
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
    console.log(this.loginDetails, 'loginDetails');
    this.getStartDate();
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
    this.lastWeakMonth = this.datePipe.transform(
      this.getLastWeeksMonth(),
      'yyyy-MM-dd'
    );
    this.viewCalender();
  }

  getLastWeeksDate() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
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
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
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

  getStartDate() {}
}
