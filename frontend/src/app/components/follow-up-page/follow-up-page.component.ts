import { Component, OnInit } from '@angular/core';
import { Job } from '@app/_models/Job';
import { User } from '@app/_models/user';
import {
  AuthenticationService,
  ClientService,
  FreelancerService,
} from '@app/_services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-follow-up-page',
  templateUrl: './follow-up-page.component.html',
  styleUrls: ['./follow-up-page.component.scss'],
})
export class FollowUpPageComponent implements OnInit {
  user: User;
  jobs: Job[] = [];
  loading = false;

  constructor(
    private authenticationService: AuthenticationService,
    private freelancerService: FreelancerService,
    private clientService: ClientService
  ) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit() {
    this.loading = true;
    if (this.user.userType === 'clients') {
      this.clientService
        .getClientJobs(this.user.id)
        .pipe(first())
        .subscribe((jobs) => {
          this.loading = false;
          this.jobs = jobs;
        });
    } else {
      this.freelancerService
        .getFreelancerJobs(this.user.id)
        .pipe(first())
        .subscribe((jobs) => {
          this.loading = false;
          this.jobs = jobs;
        });
    }
  }
}
