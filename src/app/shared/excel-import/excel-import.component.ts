import { ToastService } from './../dataService/toastService';
import { ExportService } from './../export.service';
import { SharedServiceService } from './../shared-service.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { XlxsToJSONService } from '../excel.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { MessageService } from 'primeng/api/messageservice';

type AOA = any[][];
@Component({
  selector: 'app-excel-import',
  templateUrl: './excel-import.component.html',
  styleUrls: ['./excel-import.component.scss'],
  providers: [DatePipe],
})
export class ExcelImportComponent implements OnInit {
  loader: boolean = false;
  data: AOA = [
    [1, 2],
    [3, 4],
  ];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  uploadedFiles: any[] = [];
  excelList: any;
  mappedPackageDimensionId: any = {};
  file: any;
  datalist: any;
  workbookData: any;
  rowsInputVisible: boolean = false;

  constructor(
    private sharedServiceService: SharedServiceService,
    private excelService: XlxsToJSONService,
    private router: Router,
    private exportService: ExportService,
    private ToastService: ToastService
  ) {}

  ngOnInit(): void {}

  parseData(event: any) {
    this.loader = true;
    let file = event.target.files[0];

    console.log(file, 'file');
    this.excelService.parseExcel(file).subscribe(
      (res: any) => {
        this.loader = false;

        // res = JSON.parse(res);
        console.log(res, '========');
        let excelData = JSON.parse(res);
        this.excelList = excelData.map((data: any) => {
          let elements = data.dob.split('-');
          let dob = `${elements[2]}/${elements[1]}/${elements[0]}`;
          return {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            dob: dob, //data.dob.toString(),
            sex: data.sex,
          };
        });
        console.log(this.excelList, 'list');
      },
      (error: any) => {
        this.loader = false;
        this.ToastService.showError(error.error.message);
      }
    );
  }

  ExcelDateToJSDate(serial: any) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(
      date_info.getFullYear(),
      date_info.getMonth(),
      date_info.getDate(),
      hours,
      minutes,
      seconds
    );
  }

  uploadData() {
    this.loader = true;
    let data = {
      employee: this.excelList,
    };
    this.sharedServiceService.uploadExcel(data).subscribe(
      (res) => {
        this.loader = false;
        this.datalist = res;
        console.log(this.datalist, '12w3ee444');
        this.ToastService.showSuccess('Excel Import Sucessfully');
        this.router.navigateByUrl('/cordinator/EmployeeList');
      },
      (error: any) => {
        this.loader = false;
        this.ToastService.showError(error.error.message);
      }
    );
  }

  exportAsXLSX(): void {
    // if (this.allowTemplateDownload) {
    //   console.log(+this.noOfRowsToGenerate);
    this.rowsInputVisible = false;
    this.workbookData = [...this.transform(this.template)];
    this.exportService.exportAsExcelFile(this.workbookData, 'sample');
  }
  // }

  template: any = [];
  transform(data: any) {
    return data.map(({ name, values }: any) => {
      const headers = values.reduce(
        (prev: any, next: any) => ({
          ...prev,
          [next.header]: Array.isArray(next.value)
            ? next.value.map(({ name }: any) => name)
            : next.value,
        }),
        {}
      );
      return {
        workSheet: name,
        // rows: Array(+this.noOfRowsToGenerate).fill(headers),
        // rows: Array(10).fill(headers),
      };
    });
  }
}
