import axios from "axios";
import ApiCollector, { config, OMDB_API_KEY } from "../utils/api";
import {
  ExternalID,
  Movie,
  MovieOMDB,
  MovieTMDB,
  RawMovie,
  SearchTMDB,
} from "../models/Movie";
import { Log } from "../utils/logger";
const MOVIE_API = "http://localhost:8080/movies";

export default class MovieService {
  public static async getMovies(): Promise<Movie[]> {
    try {
      const response = await axios.get(MOVIE_API);
      const movies = response.data as Movie[];
      return movies;
    } catch (error) {
      // Handle errors here
      throw error;
    }
  }

  public static async addMovie(movie: Movie): Promise<boolean> {
    try {
      await axios.post(MOVIE_API, movie);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const omdbEndpoint = (id: string) => `i=${id}&apikey=${OMDB_API_KEY}`;

export async function fetchMovie(
  query: string
): Promise<Partial<RawMovie> | null> {
  const param = encodeURIComponent(query);
  let tmdb: Partial<MovieTMDB | null> = {};
  let omdb: Partial<MovieOMDB | null> = {};
  if (/^\d+$/.test(param)) {
    tmdb = await SearchTMDBById(param);
    omdb = await searchOMDB(tmdb?.imdb_id!);
  } else if (/^ev\d{7}\/\d{4}(-\d)?$|^(ch|co|ev|nm|tt)\d{1,8}$/.test(param)) {
    omdb = await searchOMDB(param);
    const ids = await getIdsFromExternal(omdb?.imdbID!);
    tmdb = await SearchTMDBById(ids?.id!);
  } else {
    const temp = await SearchTMDBByTitle(param);
    const ids = await getIdsFromExternal(temp?.id!);
    tmdb = await SearchTMDBById(ids?.id!);
    omdb = await searchOMDB(ids?.imdb_id!);
  }
  console.log({ ...tmdb, ...omdb });
  return { ...tmdb, ...omdb };
}

async function SearchTMDBById(id: string | number): Promise<MovieTMDB | null> {
  const api = new ApiCollector<MovieTMDB>("https://api.themoviedb.org/3");
  const tmdbData = await api.request(config(id, "detail"));
  return tmdbData ?? null;
}

async function SearchTMDBByTitle(
  title: string | number
): Promise<MovieTMDB | null> {
  const api = new ApiCollector<SearchTMDB>("https://api.themoviedb.org/3");
  const tmdbData = await api.request(config(title, "search"));
  return tmdbData!.results[0] ?? null;
}

async function searchOMDB(id: string): Promise<MovieOMDB | null> {
  const omdbData = await axios.get<MovieOMDB>(
    `https://www.omdbapi.com/?${omdbEndpoint(id)}`
  );
  return omdbData.data;
}

async function getIdsFromExternal(
  id: string | number
): Promise<ExternalID | null> {
  if (!id) return null;
  const api = new ApiCollector<ExternalID>("https://api.themoviedb.org/3");
  const externalData = await api.request(config(id, "external"));
  return externalData;
}
