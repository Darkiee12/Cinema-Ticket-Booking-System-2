interface Backdrop {
  file_path: string;
  height: number;
  width: number;
  iso_639_1: string;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
}

export interface Image {
  backdrops: Backdrop[];
}
