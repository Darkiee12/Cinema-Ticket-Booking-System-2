import Cinema from "../models/Cinema.ts";
import ApiCollector from "../utils/api.ts";

export default class CinemaService {
  private static api = new ApiCollector(
    "http://localhost:8080/cinemas/"
  );
  public static async getCinema() {
    const response = await this.api.get<Cinema[]>("get-all");
    if(response.ok){
      return response.data;
    } else {
      return response.error;
    }
  }

  public static async addCinema(cinema: Cinema) {
    const response = await this.api.post("add-cinema", cinema);
    if (response.ok) {
      return response;
    } else {
      return response.error;
    }
  }
}
