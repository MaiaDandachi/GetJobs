import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/_models/user';
import { AuthenticationService, JobService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
})
export class JobCreateComponent implements OnInit {
  submitted = false;
  loading = false;
  user: User;
  error = '';

  constructor(
    private authenticationService: AuthenticationService,
    private jobService: JobService,
    private router: Router
  ) {
    this.user = this.authenticationService.userValue;
  }

  addJobForm = new FormGroup({
    jobTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    jobDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  get f() {
    return this.addJobForm.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.addJobForm.invalid) {
      return;
    }

    this.loading = true;
    this.jobService
      .createJob(
        this.addJobForm.value['jobTitle'],
        this.addJobForm.value['jobDescription'],
        'open',
        this.user.id
      )
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      })
      .add(() => (this.loading = false));
  }
}
