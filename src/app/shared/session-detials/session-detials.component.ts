import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { ToastService } from '../dataService/toastService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { el } from '@fullcalendar/core/internal-common';
declare var $: any;

@Component({
  selector: 'app-session-detials',
  templateUrl: './session-detials.component.html',
  styleUrls: ['./session-detials.component.scss'],
  providers: [DatePipe],
})
export class SessionDetialsComponent implements OnInit {
  // appointmentsDisplay: boolean = false;
  val2: any;

  loader: boolean = false;
  appointmentList: any;
  Id: any;
  userDetails: any = JSON.parse(localStorage.getItem('loginDetails') || '');
  mentorId: any;
  menteeId: any;
  appointmentDetails: any = [];
  appointmentSection: boolean = false;
  display: boolean = false;
  appointmentId: any;
  userId: any;
  openSlotsPopup: boolean = false;
  selectedAppointment: any;
  mentorlist: any;
  appointmentOpenList: any = [];
  lastWeakDate: any;
  // @Input('appointmentList') appointmentList:any;

  constructor(
    private sharedService: SharedServiceService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ToastService: ToastService,
    private sharedServiceService: SharedServiceService,
    private datePipe: DatePipe
  ) {
    this.Id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getappointmentBookedList();

    this.lastWeakDate = this.datePipe.transform(
      this.getLastWeeksDate(),
      'yyyy-MM-dd'
    );
  }

  getLastWeeksDate() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
  }

  getappointmentBookedList() {
    if (this.userDetails.roleId == 101) {
      this.mentorId = 0;
      this.menteeId = 0;
    }
    if (this.userDetails.roleId == 102) {
      this.mentorId = this.userDetails.userId;
      this.menteeId = 0;
    }
    if (this.userDetails.roleId == 103) {
      this.mentorId = 0;
      this.menteeId = this.userDetails.userId;
    }

    this.loader = true;

    let req = {
      programId: this.Id,
      mentorId: this.mentorId,
      menteeId: this.menteeId,
      startDate: 0,
      endDate: 0,
    };
    this.sharedService.getAppointmentList(req).subscribe(
      (res: any) => {
        this.appointmentList = res.data.filter((el: any) => {
          if (el.appointmentStatusLabel == 'Booked') {
            return el;
          }
        });
        if (this.appointmentList.length == 1) {
          this.appointmentSection = true;
          this.appointmentDetails = this.appointmentList[0];
        }

        this.loader = false;
      },
      (error: any) => {
        this.loader = false;
        this.ToastService.showError('Something Is Wrong');
      }
    );
  }

  appointmentDetailId(appointment: any) {
    this.appointmentSection = true;
    // $('#nav-session1').modal('show');
    console.log(appointment);
    this.appointmentDetails = appointment;
  }

  deleteAppointmentDetails(deatail: any) {
    this.display = true;
    this.appointmentId = deatail.id;
    if (this.userDetails.roleId == 102) {
      this.userId = this.userDetails.userId;
    } else if (this.userDetails.roleId == 103) {
      this.userId = this.userDetails.userId;
    }
  }

  deleteProgram() {
    const params: any = {};
    params.appointmentId = this.appointmentId;
    params.userId = this.userId;
    this.sharedService.deleteApointmentList(params).subscribe({
      next: (result: any) => {
        console.log(result);
        this.display = false;
        this.ToastService.showSuccess('Appointment cancelled successfully.');
        this.getappointmentBookedList();
        this.appointmentSection = false;
      },
      error: (error: any) => {},
    });
  }

  addAppointments() {
    this.openSlotsPopup = false;
  }

  rescheduleAppointment(appointment: any) {
    this.openSlotsPopup = true;
    this.appointmentId = appointment.id;
    if (this.userDetails.roleId == 102) {
      this.userId = this.userDetails.userId;
    } else if (this.userDetails.roleId == 103) {
      this.userId = this.userDetails.userId;
    }
    this.getMentorList();
    // if (this.userDetails.roleId == 102) {
    //   this.userId = this.userDetails.userId;
    // }else if (this.userDetails.roleId == 103) {
    //   this.userId = this.userDetails.userId;
    // }
    this.getappointmentBookedList();
    this.getAppointmentOpenList();
  }

  selectedItem(slots: any) {
    this.selectedAppointment = slots.id;
    console.log(this.selectedAppointment);
    slots.confirmBook = true;
  }

  BookAppointment(slots: any) {
    console.log(slots);
    this.loader = true;
    let req = {
      appointmentId: slots.id,
      menteeId: this.userDetails.userId,
    };
    this.deleteProgram();
    this.sharedService.bookAppointmentSlots(req).subscribe(
      (res: any) => {
        this.loader = false;
        this.openSlotsPopup = false;
        this.ToastService.showSuccess('Appointment Reschedule successfully');
        this.getappointmentBookedList();
        this.getAppointmentOpenList();
      }, 
      (error: any) => {
        this.loader = false;
      }
    );
  }

  getMentorList() {
    this.loader = true;
    let data = {
      id: this.Id,
    };
    this.sharedServiceService.getMentorListForProgram(data).subscribe(
      (res) => {
        this.loader = false;
        this.mentorlist = res;
        this.getAppointmentOpenList();
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  getAppointmentOpenList() {
    if (this.userDetails.roleId == 102) {
      this.mentorId = this.userDetails.userId;
    }
    if (this.userDetails.roleId == 103) {
      this.mentorId = this.mentorlist[0].userId;
    }
    let req = {
      programId: this.Id,
      mentorId: this.mentorId,
      menteeId: 0,
      startDate: 0,
      endDate: 0,
    };
    this.sharedService.getAppointmentList(req).subscribe((res: any) => {
      this.appointmentDuplicateList = res.data.filter((el: any) => {
        if (
          el.startTime.split('T')[0] >= new Date().toISOString().split('T')[0]
        ) {
          return el;
        }
      });
      console.log(this.appointmentDuplicateList);
      this.appointmentOpenList = this.appointmentDuplicateList.filter(
        (el: any) => {
          if (
            el.appointmentStatusLabel == 'Open' &&
            el.startTime.split('T')[0] ==
              this.selectedDate1.toISOString().split('T')[0]
          ) {
            el.confirmBook = false;
            return el;
          }
        }
      );
      console.log(this.appointmentOpenList);
    });
  }

  selectedDate1: any = new Date();
  currentDate = new Date();
  selectedDate: any = new Date();
  appointmentDuplicateList: any;

  changeSelectedDate(event: any) {
    let date = event;
    let newDate = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
    this.selectedDate = newDate;
    this.selectedDate1 = newDate;
    this.appointmentOpenList = this.appointmentDuplicateList.filter(
      (el: any) => {
        if (
          el.appointmentStatusLabel == 'Open' &&
          el.startTime.split('T')[0] == this.selectedDate
        ) {
          el.confirmBook = false;
          return el;
        }
      }
    );
  }

  getDate(selectedDate: any) {
    let date = new Date(selectedDate);

    return `${date}`.slice(0, 10);
  }

  getPreviousDate(selectedDate1: any) {
    console.log(selectedDate1);
    let date = new Date(+new Date(selectedDate1) - 1000 * 60 * 60 * 24);
    this.selectedDate = `${date.getFullYear()}-${
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    }-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`;
    this.selectedDate1 = new Date(this.selectedDate);
    this.getDate(this.selectedDate1);
    this.changeSelectedDate(this.selectedDate1);
  }

  getNextDate(selectedDate1: any) {
    let date = new Date(+new Date(selectedDate1) + 1000 * 60 * 60 * 24);
    this.selectedDate = `${date.getFullYear()}-${
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    }-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`;
    this.selectedDate1 = new Date(this.selectedDate);
    this.getDate(this.selectedDate1);
    this.changeSelectedDate(this.selectedDate1);
  }
}
