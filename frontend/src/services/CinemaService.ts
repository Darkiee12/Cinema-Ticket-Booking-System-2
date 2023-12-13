import axios from "axios";
import Cinema from "../models/Cinema";
const CINEMA_ENDPOINT = "http://localhost:8080/cinemas/add-cinema";

export default class MovieService {
  public static async getCinemas(): Promise<Cinema[]> {
    try {
      const response = await axios.get(CINEMA_ENDPOINT);
      const movies = response.data as Cinema[];
      return movies;
    } catch (error) {
      // Handle errors here
      throw error;
    }
  }

  public static async addCinema(cinema: Cinema): Promise<boolean> {
    try {
      await axios.post(CINEMA_ENDPOINT, cinema);
      return true;
    } catch (error) {
      return false;
    }
  }
}
