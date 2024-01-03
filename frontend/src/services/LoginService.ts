import ApiCollector from "../utils/api.ts";
import User, {Credential} from "../models/User.ts";



export default class LoginService {
  private static api = new ApiCollector("http://localhost:8080/users/");

  public static async login(credential: Credential) {
    const response = await this.api.login<Credential, User>("login", credential);
    if(response.ok){
      return response.data;
    } else {
      return response.error;
    }
  }
}