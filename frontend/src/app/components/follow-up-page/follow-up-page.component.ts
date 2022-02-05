import { Component, OnInit } from '@angular/core';
import { JOBS } from '../../mock-jobs';
@Component({
  selector: 'app-follow-up-page',
  templateUrl: './follow-up-page.component.html',
  styleUrls: ['./follow-up-page.component.scss'],
})
export class FollowUpPageComponent implements OnInit {
  jobs = JOBS.slice(0, 3);
  constructor() {}

  ngOnInit(): void {}
}
