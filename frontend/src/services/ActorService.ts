import Actor from "../models/Actor";
import ApiCollector, { config, TMDB_API_KEY } from "../utils/api";

export default class ActorService {
  public static async fetchActorData(query: string) {
    const name = encodeURIComponent(query);
    const api = new ApiCollector<Actor>("https://api.themoviedb.org/3");
    const res = await api.request(config(name, "actor"));
    return res.ok? res.data : res.error;
    
  }
}
