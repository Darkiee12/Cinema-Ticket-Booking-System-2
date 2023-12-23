import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";

export const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;
export const OMDB_API_KEY = process.env.REACT_APP_OMDB_KEY;

export enum HTTPStatusCode{
  "OK" = 200,
  "CREATED" = 201,
  "BAD_REQUEST" = 400,
  "UNAUTHORIZED" = 401,
  "FORBIDDEN" = 403,
  "NOT_FOUND" = 404,
  "CONFLICT" = 409,
  "INTERNAL_SERVER_ERROR" = 500,
}

export type Result<T, Error> = {
  ok: true;
  data: T;
} | {
  ok: false;
  error: Error;
} 

interface Error{
  message: string;
  statusCode: HTTPStatusCode;
}

export default class ApiCollector<T> {
  private axiosInstance: AxiosInstance;
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  private handleError(error: any): Error {
    if(axios.isAxiosError(error)){
      return {
        message: error.message,
        statusCode: error.response?.status || 500,
      };
    }
    else return {
      message: "Internal Server Error",
      statusCode: 500,
    };
  }

  async get(endpoint: string, config?: AxiosRequestConfig): Promise<Result<T, Error>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        endpoint,
        config
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async request(config: AxiosRequestConfig): Promise<T | Error> {
    try {
      const response: AxiosResponse<T> =
        await this.axiosInstance.request(config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T>(
    endpoint: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<T | Error> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        endpoint,
        data,
        config
      );
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async put(
    endpoint: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T | Error> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        endpoint,
        data,
        config
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T | Error> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        endpoint,
        config
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
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
