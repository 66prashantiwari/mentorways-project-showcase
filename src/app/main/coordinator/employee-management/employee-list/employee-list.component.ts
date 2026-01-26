import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import * as XLSX from 'xlsx';
import { CoordinatorServiceService } from '../../coordinator-service.service';
declare var $: any;
import * as FileSaver from 'file-saver';
import { ToastService } from 'src/app/shared/dataService/toastService';

type AOA = any[][];
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  loader: boolean = false;
  data: AOA = [
    [1, 2],
    [3, 4],
  ];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  employeeList: any = [];
  @ViewChild('dt1') table: any;
  selectAll: any;
  length: any;
  selectedlength: any;
  customers: any;
  loading: any;
  employeeForm: FormGroup = new FormGroup({});
  isInvalidForm: boolean = false;
  loginDetails: any = localStorage.getItem('loginDetails');
  id: number | string = 0;
  Dob: any;
  invalidDOB: boolean = false;
  newEmployeeList: any = [];
  display: boolean = false;
  createEmployee: any;
  constructor(
    private coordinatorServiceService: CoordinatorServiceService,
    private fb: FormBuilder,
    private tosterService: ToastService
  ) {}

  ngOnInit(): void {
    this.employeeDetails();
    this.formInitialize();
  }

  formInitialize() {
    this.employeeForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      UserEmail: ['', [Validators.required, Validators.email]],
      Sex: ['', [Validators.required]],
      DOB: [
        '',
        [
          Validators.required,
          // Validators.pattern(
          //   `^(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])-[0-9]{4}$`
          // ),
        ],
      ],
    });
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log('data:', this.data);
      this.data.map((res) => {
        if (res[0] === 'no') {
          console.log(res[0]);
        } else {
          console.log(res[0]);
        }
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  //Get Employee Details
  employeeDetails() {
    this.loader = true;
    let data = 0;
    this.coordinatorServiceService.getGetEmployeeDetail(data).subscribe(
      (res) => {
        this.loader = false;
        this.employeeList = res.data;

        this.newEmployeeList = this.employeeList.map((el: any) => ({
          Id: el.Id,
          Account_Id: el.accountId,
          First_name: el.firstName,
          Last_name: el.lastName,
          Email: el.email,
          D_O_B: el.dob,
          gender: el.gender,
        }));
        console.log(this.newEmployeeList, 'new========');
      },
      (error: any) => {
        this.loader = false;
        this.tosterService.showError('Something Is Wrong');
      }
    );
  }

  search($event: any) {
    this.table.filterGlobal($event.target.value, 'contains');
  }

  loadCustomers(event: LazyLoadEvent | any) {
    this.loading = true;

    setTimeout(() => {
      this.loader = true;
      this.coordinatorServiceService
        .getGetEmployeeDetail({ lazyEvent: JSON.stringify(event) })
        .subscribe((res) => {
          this.loader = false;
          this.loading = false;
          this.customers = res.customers;
          // this.length = res.length;
          this.length = res[0].totalRecords ?? 200;
        });
    }, 1000);
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.length;
    this.selectedlength = value;
  }

  onSelectAllChange(event: any) {
    this.loader = true;
    const checked = event.checked;

    if (checked) {
      this.coordinatorServiceService.getGetEmployeeDetail(checked).subscribe(
        (res) => {
          this.loader = false;
          // this.selectedlength = res.length;
          this.length = res[0].totalRecords;
          this.selectAll = true;
        },
        (error: any) => {
          this.loader = false;
          this.tosterService.showError('Something Is Wrong');
        }
      );
    } else {
      this.loader = false;
      this.selectedlength = [];
      this.selectAll = false;
    }
  }

  addEmployee() {
    this.loader = true;
    console.log(this.employeeForm.controls);
    if (this.employeeForm.valid) {
      let req = {
        accountId: 101,
        firstname: this.employeeForm.controls['FirstName'].value,
        lastname: this.employeeForm.controls['LastName'].value,
        email: this.employeeForm.controls['UserEmail'].value,
        dob: this.Dob,
        sex: this.employeeForm.controls['Sex'].value,
        loggedInUserId: this.loginDetails.userId,
      };

      this.coordinatorServiceService.addEmployee(req).subscribe(
        (res: any) => {
          this.createEmployee = res.req;
          console.log(this.createEmployee, '  this.createEmployee');
          this.loader = false;
          this.tosterService.showSuccess('Employee added successfully.');
          this.employeeDetails();
          $('#kt_modal_add_user').modal('hide');
          this.employeeForm.reset();
        },
        (error) => {
          this.loader = false;
          this.tosterService.showError(' Somthing is wrong');
        }
      );
    } else {
      this.loader = false;
      this.isInvalidForm = true;
    }
  }

  validateDate(formControl: any, ngModelName: any, validityVariableName: any) {
    let dob = this.employeeForm.controls[formControl].value;
    console.log(dob, dob, 'dob--------');
    let [month, date, year] = dob.split('/');
    console.log(month, date, year);
    if (dob.split('/').length < 3) this.invalidDOB = true;
    else {
      if (
        month > 0 &&
        month <= 12 &&
        date > 0 &&
        date <= 31 &&
        year > 0 &&
        year <= new Date().getFullYear()
      ) {
        validityVariableName = false;
        this.invalidDOB = false;
      } else {
        this.employeeForm.controls[formControl].setValue('');
        validityVariableName = true;
        this.invalidDOB = true;
      }
    }
  }

  updateEmployee() {
    this.loader = true;
    if (this.employeeForm.valid) {
      let req = {
        firstname: this.employeeForm.controls['FirstName'].value,
        lastname: this.employeeForm.controls['LastName'].value,
        email: this.employeeForm.controls['UserEmail'].value,
        dob: this.Dob,
        sex: this.employeeForm.controls['Sex'].value,
        loggedInUserId: this.loginDetails.userId,
        employeeId: this.id,
      };
      this.coordinatorServiceService.updateEmployee(req).subscribe(
        (res: any) => {
          this.loader = false;
          this.tosterService.showSuccess('Employee updated successfully.');
          this.employeeDetails();
          $('#kt_modal_add_user').modal('hide');
          this.employeeForm.reset();
        },
        (error: any) => {
          this.loader = false;
          this.tosterService.showError(error.error.error);
        }
      );
    } else {
      this.loader = false;
      this.isInvalidForm = true;
    }
  }

  closeModal() {
    $('#kt_modal_add_user').modal('hide');
    this.employeeForm.reset();
  }

  delete(item: any) {
    this.display = true;
    this.id = item.Id;
  }
  deleteEmployee() {
    this.loader = true;
    console.log(this.id);
    let req = {
      id: this.id,
    };

    this.coordinatorServiceService.deleteEmployee(req).subscribe(
      (res: any) => {
        this.loader = false;
        this.display = false;
        this.tosterService.showSuccess('Employee deleted successfully.');
        this.employeeDetails();
      },
      (error: any) => {
        this.display = false;
        this.loader = false;
        this.tosterService.showError(error.error.error);
      }
    );
  }

  edit(item: any) {
    console.log(item.dob);
    let [year, month, date] = `${item.dob}`.split('T')[0].split('-');
    this.id = item.Id;
    this.employeeForm.controls['FirstName'].setValue(item.firstName);
    this.employeeForm.controls['LastName'].setValue(item.lastName);
    this.employeeForm.controls['UserEmail'].setValue(item.email);
    this.employeeForm.controls['DOB'].setValue(`${month}-${date}-${year}`);
    this.employeeForm.controls['Sex'].setValue(item?.gender);
  }

  exportExcel(): void {
    let element = this.newEmployeeList;
    console.log(element);
    import('xlsx').then((xlsx) => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const fileName = 'EmployeeList.xlsx';
      /* save to file */
      const FileExtension = '.xlsx';
      const excel = XLSX.writeFile(wb, fileName + FileExtension);
    });
  }
}
