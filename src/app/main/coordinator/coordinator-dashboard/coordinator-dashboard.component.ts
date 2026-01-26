import { Component, OnInit } from '@angular/core';
import { CoordinatorServiceService } from '../coordinator-service.service';
import { ToastService } from 'src/app/shared/dataService/toastService';

@Component({
  selector: 'app-coordinator-dashboard',
  templateUrl: './coordinator-dashboard.component.html',
  styleUrls: ['./coordinator-dashboard.component.scss'],
})
export class CoordinatorDashboardComponent implements OnInit {
  programList: any;
  loader: boolean = false;

  constructor(
    private coordinatorServiceService: CoordinatorServiceService,
    private tosterService: ToastService
  ) {}

  ngOnInit(): void {
    this.getProgramlist();
  }
  basicData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: '#50cd89',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'My Second dataset',
        backgroundColor: '#e4e6ef',
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };

  getProgramlist() {
    this.loader = true;
    let data = {};
    this.coordinatorServiceService.getProgramForCoordinator(data).subscribe(
      (res) => {
        this.loader = false;
        this.programList = res.reverse();
        console.log(this.programList, '=--=-=-=-=-=-=-=-=-');
      },
      (error: any) => {
        this.loader = false;
        this.tosterService.showError('Somthing is wrong');
      }
    );
  }
}
