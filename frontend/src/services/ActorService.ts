import Actor from "../models/Actor.ts";
import ApiCollector, { config } from "../utils/api.ts";

export default class ActorService {
  private static api = new ApiCollector("https://api.themoviedb.org/3");
  public static async fetchActorData(query: string) {
    const name = encodeURIComponent(query);
   
    const res = await this.api.request<Actor>(config(name, "actor"));
    return res.ok? res.data : res.error;
    
  }
}
