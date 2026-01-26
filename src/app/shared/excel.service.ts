import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
// declare var XLSX:any;
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})

@Injectable({
  providedIn: 'root'
})
export class XlxsToJSONService {
 
  constructor() { }
  parseExcel(file:any) {
    var json = new Subject();
    var reader = new FileReader();
    var json_object;

    reader.onload = function (e) {
      var data = e.target?.result;
      var workbook = XLSX.read(data, {
        type: 'binary',
      });

      workbook.SheetNames.forEach(function (sheetName : any) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
        json_object = JSON.stringify(XL_row_object);
        json.next(json_object);
      });
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
    console.log(json , 'json-------');
    return json;
  }
}
