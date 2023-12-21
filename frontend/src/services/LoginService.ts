import ApiCollector from "../utils/api";
import User, {Credential} from "../models/User";



export default class LoginService {
  private static api = new ApiCollector<User>("http://localhost:8080/users/");

  public static async login(credential: Credential): Promise<User | null> {
    const response = await this.api.post("login", credential);
    if (response) {
      return response;
    } else {
      return null;
    }
  }
}