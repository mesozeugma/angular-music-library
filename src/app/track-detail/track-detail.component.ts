import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackDetail } from './interfaces/track-detail.interface';
import { TrackDetailService } from './track-detail.service';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from '../shared/services/user.service';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css']
})
export class TrackDetailComponent implements OnInit {
  user: User;
  track$: Observable<TrackDetail>;

  constructor(
    private trackDetailService: TrackDetailService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.track$ = this.trackDetailService.fetchTrack(
      this.route.snapshot.params.id
    );
  }

  getListenUrl(url: string) {
    return this.user.server + url;
  }

  printLength(length: number) {
    const sec = length % 60;
    const min = (length - sec) / 60;
    return `${min} m ${sec} s`;
  }
}
