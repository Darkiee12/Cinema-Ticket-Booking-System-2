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
const GET_MOVIE_SQL = "http://localhost:8080/movies/sql";


export default class MovieService {
  private static api = new ApiCollector("http://localhost:8080/movies/");

  public static async getMovies() {
    const response = await this.api.get<Movie[]>("get-all");
    if(response.ok){
      return response.data;
    } else {
      return response.error;
    }
  }

  public static async getMovieByImdbId(id: string) {
    const response = await this.api.get<Movie>(`get-imdb/${id}`);
    if(response.ok){
      return response.data;
    } else {
      return response.error;
    }

  }

  public static async addMovie(movie: Movie) {
    console.log("Entering addMovie");
    const response = await this.api.post<Movie>("add-movie", movie);
    console.log("Leaving addMovie");
    if(response.ok){
      return response;
    } else {
      return response.error;
    }
  }
  public static async getMoviesByQuery(sql: string) {
    const encode = encodeURIComponent(sql);
    const response = await this.api.get<Movie[]>(`sql/${encode}`);
    if(response.ok){
      return response.data;
    } else {
      return response.error;
    }
  }
}
const omdbEndpoint = (id: string) => `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`;

export async function fetchMovie(
  query: string
): Promise<Partial<RawMovie> | null> {
  const param = encodeURIComponent(query);
  let tmdb: Partial<MovieTMDB | null> = {};
  let omdb: Partial<MovieOMDB | null> = {};
  if (/^\d+$/.test(param)) {
    tmdb = await SearchTMDBById(param);
    omdb = await SearchOMDB(tmdb?.imdb_id!);
  } else if (/^ev\d{7}\/\d{4}(-\d)?$|^(ch|co|ev|nm|tt)\d{1,8}$/.test(param)) {
    omdb = await SearchOMDB(param);
    const ids = await getIdsFromExternal(omdb?.imdbID!);
    tmdb = await SearchTMDBById(ids?.id!);
  } else {
    const temp = await SearchTMDBByTitle(param);
    tmdb = await SearchTMDBById(temp?.id!);
    omdb = await SearchOMDB(tmdb!.imdb_id!);
  }
  return { ...tmdb, ...omdb };
}

async function SearchTMDBById(id: string | number): Promise<MovieTMDB | null> {
  const api = new ApiCollector("https://api.themoviedb.org/3");
  const res = await api.request<MovieTMDB>(config(id, "detail"));
  return res.ok? res.data : null;
}

async function SearchTMDBByTitle(
  title: string | number
): Promise<MovieTMDB | null> {
  const api = new ApiCollector("https://api.themoviedb.org/3");
  const res = await api.request<SearchTMDB>(config(title, "search"));
  return res.ok? res.data.results[0] : null;
}

async function SearchOMDB(id: string): Promise<MovieOMDB | null> {
  const api = new ApiCollector();
  const res = await api.get<MovieOMDB>(omdbEndpoint(id));
  return res.ok? res.data : null;
  
}

async function getIdsFromExternal(
  id: string | number
): Promise<ExternalID | null> {
  if (!id) return null;
  const api = new ApiCollector("http://api.themoviedb.org/3");
  const res = await api.request<ExternalID>(config(id, "external"));
  return res.ok? res.data : null;
}
