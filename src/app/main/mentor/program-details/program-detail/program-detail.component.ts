import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss']
})
export class ProgramDetailComponent implements OnInit {
  programId:any;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
     this.programId = this.activatedRoute.snapshot.params['id'];
     console.log(this.programId,"========")
  }

}
