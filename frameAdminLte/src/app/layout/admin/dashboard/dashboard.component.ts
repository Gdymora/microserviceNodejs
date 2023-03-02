import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../_alert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private alertService: AlertService) { }

  ngOnInit(): void {
  }
  createPost() {
    
  }
}
