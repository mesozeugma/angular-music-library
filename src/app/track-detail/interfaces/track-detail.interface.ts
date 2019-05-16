import { Artist } from './artist.interface';
import { Album } from './album.interface';
import { AudioFile } from './audio-file.interface';

export interface TrackDetail {
  readonly album: Album;
  readonly artist: Artist;
  readonly copyright: string;
  readonly creation_date: string;
  readonly disc_number: number;
  readonly fid: string;
  readonly id: number;
  readonly is_local: boolean;
  readonly license: string;
  readonly listen_url: string;
  readonly mbid: number;
  readonly position: number;
  readonly title: string;
  uploads: ReadonlyArray<AudioFile>;
}
