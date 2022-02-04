import { Component, OnInit } from '@angular/core';
import { JOBS } from '../../mock-jobs';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  jobs = JOBS;

  constructor() {}

  ngOnInit(): void {}
}
