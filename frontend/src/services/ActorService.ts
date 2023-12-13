import Actor from "../models/Actor";
import ApiCollector, { config, TMDB_API_KEY } from "../utils/externalMovieAPI";

export default class ActorService {
  public static async fetchActorData(query: string): Promise<Actor | null> {
    const name = encodeURIComponent(query);
    if (!TMDB_API_KEY) {
      console.error("TMDB_API_KEY is not set.");
      return null;
    }

    let api = new ApiCollector<Actor>("https://api.themoviedb.org/3");
    const actor = await api.request(config(name, "actor"));
    return actor;
  }
}
