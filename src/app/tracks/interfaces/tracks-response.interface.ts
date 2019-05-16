import { TrackDetail } from '../../track-detail/interfaces/track-detail.interface';

export interface TracksResponse {
  readonly count: number;
  readonly next: string;
  readonly previous: string;
  results: ReadonlyArray<TrackDetail>;
}
