import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from "axios";
import { Err, Ok, Try } from "./result";
export const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;
export const OMDB_API_KEY = process.env.REACT_APP_OMDB_KEY;

export enum HTTPStatusCode {
  "OK" = 200,
  "CREATED" = 201,
  "BAD_REQUEST" = 400,
  "UNAUTHORIZED" = 401,
  "FORBIDDEN" = 403,
  "NOT_FOUND" = 404,
  "CONFLICT" = 409,
  "INTERNAL_SERVER_ERROR" = 500,
}

export class Response {
  message: string;
  statusCode: HTTPStatusCode;
  constructor(message: string, statusCode: HTTPStatusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}


export default class ApiCollector<T> {
  private axiosInstance: AxiosInstance;
  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  async get(endpoint: string, config?: AxiosRequestConfig) {
    const res = await Try(this.axiosInstance.get<T>(endpoint, config));
    if (res.ok) {
      return Ok({ data: res.data });
    } else {
      return Err(
        new Response(res.error.message, (res.error as AxiosError).status!)
      );
    }
  }

  async request(config: AxiosRequestConfig) {
    const res = await Try(this.axiosInstance.request<T>(config));
    if (res.ok) {
      return Ok({ data: res.data });
    } else {
      return Err(
        new Response(res.error.message, (res.error as AxiosError).status!)
      );
    }
  }

  async login<R>(endpoint: string, data: R, config?: AxiosRequestConfig) {
    const res = await Try(this.axiosInstance.post<T>(endpoint, data, config));
    if (res.ok) {
      return Ok({ data: res.data });
    } else {
      return Err(
        new Response(res.error.message, (res.error as AxiosError).status!)
      );
    }
  }

  async post(endpoint: string, data: T, config?: AxiosRequestConfig) {
    const res = await Try(this.axiosInstance.post<T>(endpoint, data, config));
    if (res.ok) {
      return Ok(new Response(res.statusText, res.status));
    } else {
      return Err(
        new Response(res.error.message, (res.error as AxiosError).status!)
      );
    }
  }

  async put(endpoint: string, data: any, config?: AxiosRequestConfig) {
    const res = await Try(this.axiosInstance.put(endpoint, data, config));
    if (res.ok) {
      return Ok({ data: res.data });
    } else {
      return Err(
        new Response(res.error.message, (res.error as AxiosError).status!)
      );
    }
  }

  async delete(endpoint: string, config?: AxiosRequestConfig) {
    const res = await Try(this.axiosInstance.delete(endpoint, config));
    if (res.ok) {
      return Ok({ data: res.data });
    } else {
      return Err(
        new Response(res.error.message, (res.error as AxiosError).status!)
      );
    }
  }
}
type Endpoint = {
  detail: string;
  external: string;
  search: string;
  actor: string;
  image: string;
};

const endpoint = (param: string | number) => {
  return {
    detail: `/movie/${param}?language=en-US`,
    external: `/movie/${param}/external_ids`,
    search: `/search/movie?query=${param}&language=en-US&page=1`,
    actor: `/search/person?query=${param}&language=en-US&page=1`,
    image: `/movie/${param}/images`,
  };
};

export const config = (param: string | number, option: keyof Endpoint) => {
  const queryURL = endpoint(param)[option];
  return {
    method: "GET",
    url: queryURL,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };
};
