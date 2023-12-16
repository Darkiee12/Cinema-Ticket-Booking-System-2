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
  logo_path?: string;
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
interface CompanyDB{
  id: number,
  logoPath?: string,
  name: string,
}

interface CountryDB{
  iso31661: string,
  name: string,
}

interface GenreDB{
  id: number,
  name: string,
}

interface LanguageDB{
  iso6391: string,
  englishName: string,
  name: string,
}

interface RatingDB{
  source: string,
  value: string,
}

interface CastMemberDB{
  name: string,
  role: string,
}

export interface Movie {
  imdbId: string;
  tmdbId: number;
  title: string;
  originalTitle: string;
  year: number;
  rated: string;
  released: string;
  runtime: number;
  genre: GenreDB[];
  cast: CastMemberDB[];
  companies: CompanyDB[];
  plot: string;
  language: LanguageDB[];
  originalLanguage: string;
  countries: CountryDB[];
  awards: string;
  poster: string;
  tagline: string;
  ratings?: RatingDB[];
  metascore: number | null;
  imdbRating: number | null;
  imdbVotes: number | null;
  type: string;
  dvd?: string;
  boxOffice: number | null;
  production?: string;
  website?: string;
}


export function convertMovie(movie: RawMovie): Movie {
  const cast: CastMemberDB[] = [];
  movie.Actors.split(",").forEach((actor) => {
    cast.push({ name: actor.trim(), role: "actor" });
  });
  movie.Director.split(",").forEach((director) => {
    cast.push({ name: director.trim(), role: "director" });
  });
  movie.Writer.split(",").forEach((writer) => {
    cast.push({ name: writer.trim(), role: "writer" });
  });
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
    genre: movie.genres,
    cast: cast,
    plot: movie.overview,
    language: movie.spoken_languages.map((
      language
    ) => ({
      iso6391: language.iso_639_1,
      englishName: language.english_name,
      name: language.name,
    })
    ),
    originalLanguage: movie.original_language,
    companies: movie.production_companies.map((
      company
    ) => ({
      id: company.id,
      logoPath: company.logo_path,
      name: company.name,
    })
    ),
    countries: movie.production_countries.map((country) => ({
      iso31661: country.iso_3166_1,
      name: country.name,
    })),
    awards: movie.Awards,
    poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    ratings: convertRatings(movie.Ratings),
    metascore: movie.Metascore ? parseInt(movie.Metascore) : null,
    imdbRating: movie.imdbRating ? parseFloat(movie.imdbRating) : null,
    imdbVotes: movie.imdbVotes ? parseInt(movie.imdbVotes) : null,
    type: movie.Type,
    dvd: movie.DVD === "N/A" ? undefined : movie.DVD,
    boxOffice: movie.revenue,
    production: movie.Production === "N/A" ? undefined : movie.Production,
    website: movie.homepage,
  };
}

function convertRatings(ratings: RatingOMDB[] | null): Rating[] {
  if (!ratings) {
    return [];
  }
  return ratings
    .map((rating) => {
      if (!rating) {
        return null;
      }
      return {
        source: rating.Source || '',
        value: rating.Value || '',
      };
    })
    .filter((rating) => rating !== null) as Rating[];
}

