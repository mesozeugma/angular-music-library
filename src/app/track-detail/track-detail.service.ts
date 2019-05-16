import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class TrackDetailService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  fetchTrack(id: number): Observable<any> {
    const user = this.userService.getUser();
    return this.http
      .get(user.server + `/api/v1/tracks/${id}/`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .pipe(
        catchError(err => {
          this.router.navigate(['/tracks']);
          return EMPTY;
        })
      );
  }
}
