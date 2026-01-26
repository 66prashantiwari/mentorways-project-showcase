import { SharedServiceService } from './../shared-service.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MentorServiceService } from 'src/app/main/mentor/mentor-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoordinatorServiceService } from 'src/app/main/coordinator/coordinator-service.service';
import { ToastService } from '../dataService/toastService';
import { SessionDetialsComponent } from '../session-detials/session-detials.component';
declare var $: any;

@Component({
  selector: 'app-share-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss'],
})
export class ProgramDetailComponent implements OnInit {
  @ViewChild('sessionDetails', { static: false })
  sessionAppoientDetails!: SessionDetialsComponent;
  text: any;
  menteelist: any;
  filteredParticipants: any = [];
  participants: any;
  programlist: any;
  programDetails: any;
  employeeList: any;
  loader: boolean = false;
  @Input('programId') Id: any;
  userid: any;
  isInvalidForm: boolean = false;
  isSelectedMentor: boolean = false;
  programStatus: any;
  loginDetails: any;
  inprogressstatus: boolean = false;
  mentorlist: any;
  createAppointmentForm: FormGroup = new FormGroup({});
  feedbackForm: FormGroup = new FormGroup({});
  createAppointmentPopup: boolean = false;
  daysList: any = [
    { label: 'Mo', value: 1 },
    { label: 'Tu', value: 2 },
    { label: 'We', value: 3 },
    { label: 'Th', value: 4 },
    { label: 'Fr', value: 5 },
    { label: 'Sa', value: 6 },
    { label: 'Su', value: 7 },
  ];
  selectedDaysValue: Set<any> = new Set([]);
  appointmentSlotList: any;
  activeValues: any;
  openSlotsPopup: boolean = false;
  endDateValid: boolean = false;
  isInvalidDate: boolean = false;
  isInvalidStartDate: boolean = false;
  isInvalidEndDate: boolean = false;
  selectedTimeValue: boolean = false;
  isInvalidTime: boolean = false;
  isInvalidStartTime: boolean = false;
  isInvalidEndTime: boolean = false;
  appointmentList: any;
  appointmentMentorSchedule: any;
  appointmentMentorDuplicateList: any;
  confirmBook: boolean = false;
  mentorId: any;
  selectedAppointmentId: any;
  selectedAppointmentDays: boolean = false;
  menteeSurveyId: any;
  mentorSurveyId: any;
  startDateInValid: boolean = false;
  deletePopup: boolean = false;
  appointmentId: any;
  dateCount: number = 0;
  feedback: boolean = false;
  feedbacksubmit: any;
  feedbackName: any;
  checkboxValue: any;
  feedbackList: any;
  attendeeId: any;
  disabled: boolean = false;
  searchvalue: any;
  @ViewChild('dt1') table: any;
  constructor(
    private sharedServiceService: SharedServiceService,
    private mentorServiceService: MentorServiceService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private coordinatorServiceService: CoordinatorServiceService,
    private ToastService: ToastService
  ) {
    this.Id = this.activatedRoute.snapshot.params['id'];
    this.loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '');
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getMentorList();
    this.getProgramList();
    this.employeeDetails();
    this.getProgramDetails();
    this.initializeFeedbackForm();
    this.getFeedback();
    this.getMenteeList();
    setTimeout(() => {
      this.getAppointmentMentorSchedule();
    }, 1000);
  }

  // ngAfterViewInit() {
  //   // Child component is available here
  //   this.sessionAppoientDetails.getappointmentBookedList();
  // }

  initializeForm() {
    this.createAppointmentForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      duration: ['', [Validators.required]],
    });
  }

  initializeFeedbackForm() {
    this.feedbackForm = this.fb.group({
      rating: [''],
      comment: [''],
      isAnonymous: [''],
    });
  }

  search($event: any) {
    this.table.filterGlobal($event.target.value, 'contains');
  }

  employeeDetails() {
    this.loader = true;
    let data = {};
    this.coordinatorServiceService.getGetEmployeeDetail(this.Id).subscribe(
      (res) => {
        this.loader = false;
        this.employeeList = res.data;

        // this.newEmployeeList = this.employeeList.map((el: any) => ({
        //   Id: el.Id,
        //   Account_Id: el.accountId,
        //   First_name: el.firstName,
        //   Last_name: el.lastName,
        //   Email: el.email,
        //   D_O_B: el.dob,
        //   gender: el.gender,
        // }));
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  getMenteeList() {
    this.loader = true;
    let data = {
      id: this.Id,
    };
    this.sharedServiceService.getMenteeListForProgram(data).subscribe(
      (res) => {
        this.loader = false;
        this.menteelist = res[0];
      },
      (error) => {
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
        this.mentorlist = res[0];
        this.getAppointmentList();
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  getProgramList() {
    this.loader = true;
    let data = {
      userId: this.Id,
      roleId: this.loginDetails.roleId,
    };
    this.mentorServiceService.getPrgramForMentorMentee(data).subscribe(
      (res) => {
        this.loader = false;
        this.programlist = res;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  getProgramDetails() {
    this.loader = true;
    this.sharedServiceService.getProgramdetails(this.Id).subscribe(
      (res) => {
        this.loader = false;
        this.programDetails = res[0];
        this.menteeSurveyId = this.programDetails.menteeSurveyId;
        this.mentorSurveyId = this.programDetails.mentorSurveyId;
        if (
          this.programDetails?.statusLabel == 'Completed' &&
          (this.loginDetails.roleId == 102 || this.loginDetails.roleId == 103)
        ) {
          this.feedback = true;
        }
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  updateProgramStatus(id: number) {
    this.loader = true;
    if (this.menteelist?.employeeId && this.mentorlist?.employeeId) {
      let req = {
        programId: parseInt(this.Id),
        statusId: id,
      };
      if (id == 2) {
        const params: any = {};
        params.programId = parseInt(this.Id);
        params.mentorSurveyId = this.mentorSurveyId;
        params.menteeSurveyId = this.menteeSurveyId;
        this.sharedServiceService.lanchServey(params).subscribe({
          next: (result: any) => {
            console.log(result);
            this.ToastService.showSuccess('Survey send successfully!');
            this.getProgramDetails();
          },
          error: (error) => {},
        });
        this.sharedServiceService.updateStatus(req).subscribe((res: any) => {
          this.programStatus = res.Data;
          this.loader = false;
          this.getProgramDetails();
        });
      } else {
        this.sharedServiceService.updateStatus(req).subscribe((res: any) => {
          this.programStatus = res.Data;
          this.loader = false;
          this.getProgramDetails();
        });
      }
    } else {
      this.loader = false;
      this.ToastService.showError('Add Mentor And Mentee');
    }
  }

  startProgram() {
    this.inprogressstatus = true;
  }

  selectedValue: any = [];
  selectedDays(event: any, days: any) {
    if (this.selectedDaysValue.has(days.value)) {
      for (let i = 0; i <= this.selectedDaysValue.size; i++) {
        this.selectedDaysValue.delete(days.value);
      }
    } else {
      this.selectedDaysValue.add(event.target.value);

      this.selectedValue = Array.from(this.selectedDaysValue).join(',');
    }
  }

  createAppointments() {
    this.ValidateDate();
    this.validateTime();
    if (this.createAppointmentForm.valid) {
      if (this.selectedDaysValue.size > 0) {
        if (this.startDateInValid == false && this.isInvalidDate == false) {
          if (this.isInvalidTime == false) {
            this.loader = true;
            let req = {
              mentorId: parseInt(this.loginDetails.userId),
              programId: parseInt(this.Id),
              startDate: this.createAppointmentForm.controls['startDate'].value,
              endDate: this.createAppointmentForm.controls['endDate'].value,
              startTime: this.createAppointmentForm.controls['startTime'].value,
              endTime: this.createAppointmentForm.controls['endTime'].value,
              duration: this.createAppointmentForm.controls['duration'].value,
              days: this.selectedValue,
            };
            this.sharedServiceService.createAppointmentSlots(req).subscribe(
              (res: any) => {
                this.appointmentSlotList = res.data;
                this.ToastService.showSuccess('Slots created successfully.');
                this.getAppointmentList();
                this.createAppointmentPopup = false;
                this.openSlotsPopup = true;
                this.loader = false;
                this.createAppointmentForm.reset();
                this.selectedDaysValue.clear();
              },
              (error: any) => {
                this.ToastService.showError(error.error.message);
                this.loader = false;
              }
            );
          }
        }
      } else {
        this.selectedAppointmentDays = true;
        this.isInvalidForm = true;
      }
    } else {
      this.selectedAppointmentDays = false;
      this.isInvalidForm = true;
    }
  }

  ValidateDate() {
    if (
      this.createAppointmentForm.controls['startDate'].value &&
      this.createAppointmentForm.controls['endDate'].value
    ) {
      let frominputString =
        this.createAppointmentForm.controls['startDate'].value;
      let endinputString = this.createAppointmentForm.controls['endDate'].value;
      let [year, month, date] = frominputString.split('-');
      let [year1, month1, date1] = endinputString.split('-');

      if (
        new Date(frominputString)?.toISOString().split('T')[0] <
        new Date()?.toISOString().split('T')[0]
      ) {
        this.startDateInValid = true;
        this.isInvalidDate = false;
        this.isInvalidTime = false;
        this.selectedAppointmentDays = false;
      } else if (frominputString <= endinputString) {
        this.isInvalidDate = false;
        this.isInvalidTime = false;
        this.startDateInValid = false;
        this.selectedAppointmentDays = false;
      } else {
        this.isInvalidDate = true;
        this.endDateValid = false;
        this.isInvalidTime = false;
        this.startDateInValid = false;
        this.selectedAppointmentDays = false;
      }
    }
  }

  validateTime() {
    if (
      this.createAppointmentForm.controls['startTime'].value &&
      this.createAppointmentForm.controls['endTime'].value
    ) {
      let fromTime = this.createAppointmentForm.controls['startTime'].value;
      let toTime = this.createAppointmentForm.controls['endTime'].value;
      let [hour, minute] =
        this.createAppointmentForm.controls['startTime'].value.split(':');
      let [hour1, minute1] =
        this.createAppointmentForm.controls['endTime'].value.split(':');
      if (hour <= hour1 && minute <= minute1) {
        this.isInvalidTime = false;
        this.selectedAppointmentDays = false;
      } else {
        this.isInvalidTime = true;
        this.startDateInValid = false;
        this.isInvalidDate = false;
        this.endDateValid = false;
        this.selectedAppointmentDays = false;
      }
    }
  }

  addAppointments() {
    this.openSlotsPopup = false;
    this.createAppointmentPopup = true;
  }

  getAppointmentList() {
    if (this.loginDetails.roleId == '102') {
      this.mentorId = this.loginDetails.userId;
    }
    if (this.loginDetails.roleId == '103') {
      this.mentorId = this.mentorlist.userId;
    }
    let req = {
      programId: this.Id,
      mentorId: this.mentorId,
      menteeId: 0,
      startDate: 0,
      endDate: 0,
    };
    this.sharedServiceService.getAppointmentList(req).subscribe((res: any) => {
      this.appointmentDuplicateList = res.data;
      console.log(
        this.appointmentDuplicateList,
        'this.appointmentDuplicateList'
      );
      this.appointmentList = res.data.filter((el: any) => {
        if (
          el.appointmentStatusLabel == 'Open' &&
          el.startTime.split('T')[0] ==
            this.selectedDate1.toISOString().split('T')[0]
        ) {
          el.confirmBook = false;
          return el;
        }
      });
      console.log(this.appointmentList, 'this.appointmentList');
      this.changeSelectedDate(new Date());
    });
  }

  getAppointmentMentorSchedule() {
    // if (this.loginDetails.roleId == '102') {
    //   this.mentorId = this.mentorlist[0].userId;
    // }
    debugger;
    if (this.loginDetails.roleId == '103') {
      this.mentorId = this.mentorlist.userId;
    }
    let req = {
      programId: this.Id,
      mentorId: this.mentorId,
    };
    this.sharedServiceService
      .getappointmentMentorSchedule(req)
      .subscribe((res: any) => {
        debugger;
        console.log(
          this.appointmentMentorDuplicateList,
          'this.appointmentMentorDuplicateList'
        );
        console.log(res);
        console.log(res.data);debugger;
        this.selectedDate2 = new Date();
        this.appointmentMentorSchedule = res.data.filter((el: any) => {
          if (
            el.appointmentStatusId == '1' &&
            el.startTime.split('T')[0] >=
              this.selectedDate2.toISOString().split('T')[0]
          ) {
            el.confirmBook = false;
            return el;
          }
        });
        console.log(this.appointmentMentorSchedule);

        this.appointmentMentorDuplicateList = this.appointmentMentorSchedule;

        this.changeSelectedSlotDate(new Date());
        console.log(
          this.appointmentMentorSchedule,
          'this.appointmentMentorSchedule'
        );
      });
  }

  getSessionAppoient() {
    if (this.sessionAppoientDetails) {
      this.sessionAppoientDetails.getappointmentBookedList();
    }
  }

  BookAppointment(slots: any) {
    console.log(slots);
    this.loader = true;
    let req = {
      appointmentId: slots.id,
      menteeId: this.loginDetails.userId,
    };
    this.sharedServiceService.bookAppointmentSlots(req).subscribe(
      (res: any) => {
        this.loader = false;
        this.openSlotsPopup = false;
        this.ToastService.showSuccess('Appointment booked successfully');
        this.getSessionAppoient();
        // window.location.reload();
        debugger;
        this.getAppointmentMentorSchedule();
      },
      (error: any) => {
        this.loader = false;
        this.ToastService.showError(error.message);
      }
    );
  }

  selectedItem(slots: any) {
    slots.confirmBook = true;
    this.selectedAppointmentId = slots.id;
  }

  deleteSlots() {
    console.log(this.appointmentId);
    let req = {
      appointmentId: this.appointmentId,
    };
    this.sharedServiceService
      .deleteAppointmentSlot(req)
      .subscribe((res: any) => {
        this.deletePopup = false;
        this.ToastService.showSuccess('Slot deleted successfully.');
        this.getAppointmentList();
      });
  }

  selectedDate1: any = new Date();
  currentDate = new Date();
  selectedDate: any = new Date();
  appointmentDuplicateList: any;
  selectedDate2: any = new Date();
  changeSelectedDate(event: any) {
    let date = event;
    let newDate = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
    this.selectedDate = newDate;
    this.selectedDate1 = newDate;
    this.appointmentList = this.appointmentDuplicateList.filter((el: any) => {
      if (
        el.appointmentStatusLabel == 'Open' &&
        el.startTime.split('T')[0] == this.selectedDate
      ) {
        el.confirmBook = false;
        return el;
      }
    });
  }

  changeSelectedSlotDate(event: any) {
    let date = event;
    let newDate = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
    this.selectedDate = newDate;
    this.selectedDate2 = newDate;
    console.log(this.selectedDate);
    this.appointmentMentorSchedule = this.appointmentMentorDuplicateList.filter(
      (el: any) => {
        if (
          el.appointmentStatusId == '1' &&
          el.startTime.split('T')[0] == this.selectedDate
        ) {
          el.confirmBook = false;
          return el;
        }
      }
    );

    console.log(this.appointmentMentorSchedule);
  }

  getDate(selectedDate: any) {
    let date = new Date(selectedDate);

    return `${date}`.slice(0, 10);
  }

  getDates(selectedDate: any) {
    let dates = new Date(selectedDate);

    return `${dates}`.slice(0, 10);
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

  getMentorPreviousDate(selectedDate2: any) {
    console.log(selectedDate2);
    let date = new Date(+new Date(selectedDate2) - 1000 * 60 * 60 * 24);
    this.selectedDate = `${date.getFullYear()}-${
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    }-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`;
    this.selectedDate2 = new Date(this.selectedDate);
    this.getDate(this.selectedDate2);
    this.changeSelectedSlotDate(this.selectedDate2);
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

  getMentorNextDate(selectedDate2: any) {
    let date = new Date(+new Date(selectedDate2) + 1000 * 60 * 60 * 24);
    this.selectedDate = `${date.getFullYear()}-${
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    }-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`;
    this.selectedDate2 = new Date(this.selectedDate);
    this.getDate(this.selectedDate2);
    this.changeSelectedSlotDate(this.selectedDate2);
  }

  submitFeedback() {
    console.log(this.feedbackForm.controls['isAnonymous'].value);
    if (this.feedbackForm.controls['isAnonymous'].value == 'true') {
      this.checkboxValue = 0;
    } else {
      this.checkboxValue = 1;
    }
    if (this.loginDetails.roleId == '102') {
      this.feedbackName = 'Mentor';
    }
    if (this.loginDetails.roleId == '103') {
      this.feedbackName = 'Mentee';
    }
    let data = {
      Rating: this.feedbackForm.controls['rating'].value,
      Comment: this.feedbackForm.controls['comment'].value,
      IsAnonymous: this.checkboxValue,
      AttendeeId: this.loginDetails.userId,
      AttendeeRole: this.feedbackName,
      AttendeeName: this.loginDetails.firstName,
      ProgramId: this.Id,
    };
    this.sharedServiceService.postFeedback(data).subscribe((res: any) => {
      this.feedbacksubmit = res.data;
      this.feedback = false;
      this.getFeedback();
      this.feedbackForm.reset();
      console.log(this.feedbacksubmit, ' this.feedbacksubmit ');
    });
    66;
  }

  getFeedback() {
    if (this.loginDetails.roleId == '102') {
      this.attendeeId = this.loginDetails.userId;
    } else {
      this.attendeeId = 0;
    }
    if (this.loginDetails.roleId == '103') {
      this.attendeeId = this.loginDetails.userId;
    }
    let data = {
      id: this.Id,
      AttendeeId: this.attendeeId,
    };
    this.sharedServiceService.getFeedback(data).subscribe((res: any) => {
      this.feedbackList = res.data[0];
      console.log(this.feedbackList, 'this.feedbackList');
    });
  }
}
