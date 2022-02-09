import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from '@app/_helpers';
import { AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hidePwd = true;
  hideConfirmPwd = true;
  submitted = false;
  loading = false;
  error = '';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

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

    this.loading = true;
    const userType = this.registerForm.value['userRoleControl']
      ? 'clients'
      : 'freelancers';

    this.authenticationService
      .signup(
        this.registerForm.value['username'],
        this.registerForm.value['email'],
        this.registerForm.value['password'],
        userType
      )
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      })
      .add(() => (this.loading = false));
  }
}
