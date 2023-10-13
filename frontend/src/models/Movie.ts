interface Rating{
  source: string;
  value: string;
}

export default interface Movie {
  imdbId: string;
  title: string;
  year: number | null;
  rated: string;
  released: string;
  runtime: number | null;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string | null;
  language: string;
  country: string;
  awards: string;
  poster: string;
  ratings: Rating[];
  metascore: number | null;
  imdbRating: number | null;
  imdbVotes: number | null;
  type: string;
  dvd: string | null;
  boxOffice: number | null;
  production: string;
  website: string;
}