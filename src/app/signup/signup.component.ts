import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { passwordMatchValidator } from './validators/password-match.validator';
import { ErrorStateMatcher } from '@angular/material';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  error = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        funkwhaleServer: new FormControl(this.userService.funkwhaleServer, [
          Validators.required
        ]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password1: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ]),
        password2: new FormControl('', [Validators.required])
      },
      { validators: passwordMatchValidator }
    );
  }

  hasError(controlName: string, errorName: string) {
    return this.signupForm.controls[controlName].hasError(errorName);
  }

  signup(form: FormGroup) {
    const {
      funkwhaleServer,
      username,
      email,
      password1,
      password2
    } = form.value;
    this.userService
      .signup(funkwhaleServer, username, email, password1, password2)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        err => {
          this.error = true;
        }
      );
  }
}
