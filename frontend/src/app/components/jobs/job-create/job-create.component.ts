import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
})
export class JobCreateComponent implements OnInit {
  submitted = false;
  constructor() {}

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
    console.log(this.addJobForm);
  }
}
