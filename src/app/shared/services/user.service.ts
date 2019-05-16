import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  server: string;
  username: string;
  token: string;
}

@Injectable()
export class UserService {
  funkwhaleServer = 'https://demo.funkwhale.audio';

  constructor(private http: HttpClient, private router: Router) {}

  login(funkwhaleServerUrl: string, username: string, password: string) {
    return this.http
      .post(funkwhaleServerUrl + '/api/v1/token/', { username, password })
      .pipe(
        map((res: any) => {
          if (res.token) {
            return this.setUser({
              server: funkwhaleServerUrl,
              username,
              token: res.token
            });
          } else {
            return null;
          }
        })
      );
  }

  signup(
    funkwhaleServerUrl: string,
    username: string,
    email: string,
    password1: string,
    password2: string
  ) {
    return this.http
      .post(funkwhaleServerUrl + '/api/v1/auth/registration/', {
        username,
        email,
        password1,
        password2
      })
      .pipe();
  }

  private setUser(user: User) {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  getUser(): User {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
