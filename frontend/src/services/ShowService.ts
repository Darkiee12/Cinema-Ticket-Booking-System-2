import Show, { ShowFull, transformShows } from "../models/Show.ts";
import ApiCollector from "../utils/api.ts";

export default class ShowService {
  private static api = new ApiCollector(
    "http://localhost:8080/shows/"
  );
  public static async getShow() {
    const response = await this.api.get<Show[]>("get-all");
    if(response.ok){
      return response.data;
    } else {
      return response.error;
    }
  }

  public static async getShowFromMovieImdbIdAndDate(imdbId: string, date: string){
    const response = await this.api.get<any[][]>(`${imdbId}/${date}`);
    if(response.ok){
      return transformShows(response.data);
    } else {
      return response.error;
    }
  }

  public static async getShowFromId(id: number){
    const response = await this.api.get<ShowFull>(`/${id}`);
    if(response.ok){
      return response.data;
    } else {
      return response.error;
    }
  }

  public static async addShow(Show: Show) {
    const response = await this.api.post("add-Show", Show);
    if (response.ok) {
      return response;
    } else {
      return response.error;
    }
  }
}
