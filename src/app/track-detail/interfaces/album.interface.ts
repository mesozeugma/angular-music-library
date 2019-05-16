import { Artist } from './artist.interface';

export interface Album {
  readonly artist: Artist;
  readonly cover: object;
  readonly creation_date: string;
  readonly fid: string;
  readonly id: number;
  readonly is_local: boolean;
  readonly mbid: number;
  readonly release_date: string;
  readonly title: string;
}
