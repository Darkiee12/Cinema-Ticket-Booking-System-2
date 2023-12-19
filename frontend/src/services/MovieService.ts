import axios from "axios";
import ApiCollector, { config, OMDB_API_KEY } from "../utils/externalMovieAPI";
import {
  Company,
  ExternalID,
  Genre,
  Movie,
  MovieOMDB,
  MovieTMDB,
  RawMovie,
  SearchTMDB,
  SpokenLanguage,
} from "../models/Movie";
import { Log } from "../utils/logger";
const ADD_MOVIE_ENDPOINT = "http://localhost:8080/movies/add-movie";
const GET_ALL_MOVIE_ENDPOINT = "http://localhost:8080/movies/get-all";
const GET_MOVIE_SQL = "http://localhost:8080/movies/sql";


export default class MovieService {
  public static async getMovies(): Promise<Movie[]|null> {
    try {
      const response = await axios.get(GET_ALL_MOVIE_ENDPOINT);
      const movies = response.data as Movie[];
      return movies;
    } catch (error) {
      return null;
    }
  }

  public static async addMovie(movie: Movie): Promise<boolean> {
    try {
  
      await axios.post(ADD_MOVIE_ENDPOINT, movie);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  public static async getMoviesByQuery(sql: string): Promise<Movie[]|null> {
    const encode = encodeURIComponent(sql);
    try {
      const response = await axios.get(`${GET_MOVIE_SQL}/${encode}`);
      if (response.status == 200){
        return response.data as Movie[];
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}

function postObjectsAsLinks<T extends Record<string, any>>(objects: T[], baseUrl: string) {
  objects.forEach(obj => {
    const params = Object.entries(obj)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    const url = `${baseUrl}?${params}`;

    axios.post(url)
      .then(response => {
        console.log(`Successfully posted object: ${JSON.stringify(obj)}`);
        console.log(response.data);
      })
      .catch(error => {
        console.error(`Error posting object ${JSON.stringify(obj)}:`, error);
      });
  });
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
