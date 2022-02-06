import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MustMatch } from '@app/_helpers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hidePwd = true;
  hideConfirmPwd = true;
  submitted = false;

  formOptions: AbstractControlOptions = {
    validators: MustMatch('password', 'confirmPassword'),
  };

  registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
      ]),
      confirmPassword: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
      ]),
      userRoleControl: new FormControl(false),
    },
    this.formOptions
  );

  constructor() {}

  ngOnInit(): void {}

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
  }
}
