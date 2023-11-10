export interface Rating {
  source: string;
  value: string;
}

export interface RatingOMDB {
  Source: string;
  Value: string;
}

export interface ExternalID {
  id: number;
  imdb_id: string;
}

export interface Company {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
export interface MovieOMDB {
  Rated: string;
  Director: string;
  Writer: string;
  Actors: string;
  Awards: string;
  Ratings: RatingOMDB[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface SearchTMDB {
  page: number;
  results: MovieTMDB[];
}

export interface MovieTMDB {
  id: number;
  imdb_id?: string;
  title: string;
  original_title: string;
  original_language: string;
  genres: Genre[];
  overview: string;
  release_date: string;
  runtime: number;
  revenue: number | null;
  spoken_languages: SpokenLanguage[];
  production_companies: Company[];
  production_countries: ProductionCountry[];
  poster_path: string;
  tagline: string;
  homepage: string;
}

export interface RawMovie extends MovieOMDB, MovieTMDB {}

export interface Movie {
  imdbId: string;
  tmdbId: number;
  title: string;
  originalTitle: string;
  year: number;
  rated: string;
  released: string;
  runtime: number;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  productionCompanies: Company[];
  plot: string;
  language: string;
  originalLanguage: string;
  country: string;
  awards: string;
  poster: string;
  tagline: string;
  ratings: Rating[];
  metascore: number | null;
  imdbRating: number | null;
  imdbVotes: number | null;
  type: string;
  dvd: string;
  boxOffice: number | null;
  production: string;
  website: string;
}

export function convertMovie(movie: RawMovie): Movie {
  return {
    imdbId: movie.imdbID,
    tmdbId: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    tagline: movie.tagline,
    year: parseInt(movie.release_date.split("-")[0]),
    rated: movie.Rated,
    released: movie.release_date,
    runtime: movie.runtime,
    genre: movie.genres.map((genre) => genre.name).join(", "),
    director: movie.Director,
    writer: movie.Writer,
    actors: movie.Actors,
    plot: movie.overview,
    language: movie.spoken_languages
      .map((language) => language.name)
      .join(", "),
    originalLanguage: movie.original_language,
    productionCompanies: movie.production_companies,
    country: movie.production_countries
      .map((country) => country.name)
      .join(", "),
    awards: movie.Awards,
    poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    ratings: convertRatings(movie.Ratings),
    metascore: movie.Metascore ? parseInt(movie.Metascore) : null,
    imdbRating: movie.imdbRating ? parseFloat(movie.imdbRating) : null,
    imdbVotes: movie.imdbVotes ? parseInt(movie.imdbVotes) : null,
    type: movie.Type,
    dvd: movie.DVD,
    boxOffice: movie.BoxOffice ? parseInt(movie.BoxOffice) : null,
    production: movie.Production,
    website: movie.homepage,
  };
}

function convertRatings(ratings: RatingOMDB[]): Rating[] {
  return ratings.map((rating) => {
    return {
      source: rating.Source,
      value: rating.Value,
    };
  });
}
