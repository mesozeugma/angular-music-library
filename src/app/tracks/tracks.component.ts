import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TracksService } from './tracks.service';
import { TrackDetail } from '../track-detail/interfaces/track-detail.interface';
import { Artist } from '../track-detail/interfaces/artist.interface';
import { Album } from '../track-detail/interfaces/album.interface';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  tracks$: Observable<TrackDetail[]>;
  artists$: Observable<Artist[]>;
  albums$: Observable<Album[]>;
  releaseYear$: Observable<number[]>;

  artistFilter = new FormControl('');
  albumFilter = new FormControl('');
  releaseYearFilter = new FormControl('');

  tracksFiltered$: Observable<TrackDetail[]>;
  artistFilter$: Observable<number>;
  albumFilter$: Observable<number>;
  releaseYearFilter$: Observable<number>;

  constructor(private tracksService: TracksService) {}

  ngOnInit() {
    const subject = new Subject<TrackDetail[]>();

    this.tracksService.fetchTracks().subscribe(subject);
    this.tracks$ = subject;
    this.artists$ = this.tracksService.getArtists(subject);
    this.albums$ = this.tracksService.getAlbums(subject);
    this.releaseYear$ = this.tracksService.getReleaseYears(subject);

    this.artistFilter$ = this.artistFilter.valueChanges.pipe(
      startWith(0),
      map(value => Number(value))
    );
    this.albumFilter$ = this.albumFilter.valueChanges.pipe(
      startWith(0),
      map(value => Number(value))
    );
    this.releaseYearFilter$ = this.releaseYearFilter.valueChanges.pipe(
      startWith(0),
      map(value => Number(value))
    );

    this.tracksFiltered$ = this.tracksService.getFilteredTracks(
      this.tracks$,
      this.artistFilter$,
      this.albumFilter$,
      this.releaseYearFilter$
    );
  }
}
