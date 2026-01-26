import { ExportService } from './../export.service';
import { SharedServiceService } from './../shared-service.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { XlxsToJSONService } from '../excel.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styleUrls: ['./excel-export.component.scss']
})
export class ExcelExportComponent implements OnInit {
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  uploadedFiles: any[] = [];
  excelList: any;
  mappedPackageDimensionId: any = {};
file:any
  datalist: any;
  workbookData: any;
  rowsInputVisible: boolean = false;

  constructor(private exportService:ExportService) { }

  ngOnInit(): void {
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
