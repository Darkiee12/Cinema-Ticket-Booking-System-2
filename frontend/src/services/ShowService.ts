import Show from "../models/Show";
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

  public static async getShowFromMovie(imdbId: string){
    const response = await this.api.get(imdbId);
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
