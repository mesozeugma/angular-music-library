import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      funkwhaleServer: new FormControl(this.userService.funkwhaleServer, [
        Validators.required
      ]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  login(form: FormGroup) {
    const { funkwhaleServer, username, password } = form.value;
    this.userService.login(funkwhaleServer, username, password).subscribe(
      data => {
        if (data !== null) {
          this.router.navigate(['/']);
        } else {
          this.error = true;
        }
      },
      err => {
        this.error = true;
      }
    );
  }
}
