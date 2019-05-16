import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, combineLatest, EMPTY } from 'rxjs';
import { map, concatMap, toArray, startWith, catchError } from 'rxjs/operators';
import { UserService, User } from '../shared/services/user.service';
import { TracksResponse } from './interfaces/tracks-response.interface';
import { TrackDetail } from '../track-detail/interfaces/track-detail.interface';
import { Album } from '../track-detail/interfaces/album.interface';
import { Artist } from '../track-detail/interfaces/artist.interface';

@Injectable()
export class TracksService {
  constructor(private http: HttpClient, private userService: UserService) {}

  fetchTracks(page = 1): Observable<TrackDetail[]> {
    const user = this.userService.getUser();

    return this.fetchTracksPaginated(user).pipe(
      concatMap(res => res.results),
      toArray()
    );
  }

  getArtists(tracks: Observable<TrackDetail[]>): Observable<Artist[]> {
    return tracks.pipe(
      map(trackArray => {
        const artists = trackArray.map(track => track.artist);
        return artists
          .filter(
            (value, index, self) =>
              index === self.findIndex(artist => artist.id === value.id)
          )
          .sort((first, second) => first.name.localeCompare(second.name));
      })
    );
  }

  getAlbums(tracks: Observable<TrackDetail[]>): Observable<Album[]> {
    return tracks.pipe(
      map(trackArray => {
        const albums = trackArray.map(track => track.album);
        return albums
          .filter(
            (value, index, self) =>
              index === self.findIndex(album => album.id === value.id)
          )
          .sort((first, second) => first.title.localeCompare(second.title));
      })
    );
  }

  getReleaseYears(tracks: Observable<TrackDetail[]>): Observable<number[]> {
    return tracks.pipe(
      map(trackArray => {
        return trackArray
          .map(track => this.albumReleaseYear(track.album))
          .filter(
            (value, index, self) =>
              value !== -1 && index === self.findIndex(year => year === value)
          )
          .sort((first, second) => second - first);
      })
    );
  }

  getFilteredTracks(
    tracks: Observable<TrackDetail[]>,
    artistFilter: Observable<number>,
    albumFilter: Observable<number>,
    releaseYearFilter: Observable<number>
  ) {
    return combineLatest(
      tracks,
      artistFilter,
      albumFilter,
      releaseYearFilter
    ).pipe(
      map(([trackArray, artistId, albumId, releaseYear]) => {
        return trackArray.filter((value, index, self) => {
          if (artistId && value.artist.id !== artistId) {
            return false;
          }
          if (albumId && value.album.id !== albumId) {
            return false;
          }

          if (
            releaseYear &&
            this.albumReleaseYear(value.album) !== releaseYear
          ) {
            return false;
          }
          return true;
        });
      })
    );
  }

  private fetchTracksPaginated(
    user: User,
    page = 1
  ): Observable<TracksResponse> {
    return this.http
      .get(user.server + '/api/v1/tracks/', {
        headers: { Authorization: `Bearer ${user.token}` },
        params: { ordering: 'creation_date', page: String(page) }
      })
      .pipe(
        catchError(err => {
          this.userService.logout();
          return EMPTY;
        }),
        concatMap((result: TracksResponse) => {
          if (!result.next) {
            return of(result);
          } else {
            return this.fetchTracksPaginated(
              user,
              this.getPageNumberFromUrl(result.next)
            ).pipe(startWith(result));
          }
        })
      );
  }

  private getPageNumberFromUrl(url: string): number {
    const urlArray = url.split('');
    return Number(urlArray[urlArray.length - 1]);
  }

  private albumReleaseYear(album: Album) {
    if (album.release_date) {
      return Number(album.release_date.split('-')[0]);
    }
    return -1;
  }
}
