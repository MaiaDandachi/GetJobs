import { Component, OnInit } from '@angular/core';
import { AuthenticationService, JobService } from '@app/_services';

import { Job } from '@app/_models/Job';
import { first } from 'rxjs/operators';
import { User } from '@app/_models/user';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  jobs: Job[] = [];
  loading = false;
  user: User;

  constructor(
    private jobService: JobService,
    private authenticationService: AuthenticationService
  ) {
    this.user = this.authenticationService.userValue;
    this.jobService
      .getJobsUpdateListener()
      .subscribe((jobs: Job[]) => (this.jobs = jobs));
  }

  ngOnInit() {
    this.loading = true;
    this.jobService
      .getAllJobs()
      .pipe(first())
      .subscribe((jobs) => {
        this.loading = false;
        this.jobs = jobs;
      });
  }
}
