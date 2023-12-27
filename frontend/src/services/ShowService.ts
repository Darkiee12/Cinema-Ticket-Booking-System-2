import Show, { transformShows } from "../models/Show";
import ApiCollector from "../utils/api";

export default class ShowService {
  private static api = new ApiCollector<Show | Show[]>(
    "http://localhost:8080/shows/"
  );
  public static async getShow() {
    const response = await this.api.get("get-all");
    if(response.ok){
      return response.data;
    } else {
      return response.error;
    }
  }

  public static async getShowFromMovieImdbIdAndDate(imdbId: string, date: string){
    const api = new ApiCollector<any[][]>("http://localhost:8080/shows/");
    const response = await api.get(`${imdbId}/${date}`);
    if(response.ok){
      return transformShows(response.data);
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
