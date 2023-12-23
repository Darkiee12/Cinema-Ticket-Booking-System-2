import ApiCollector from "../utils/api";
import User, {Credential} from "../models/User";



export default class LoginService {
  private static api = new ApiCollector<User>("http://localhost:8080/users/");

  public static async login(credential: Credential) {
    const response = await this.api.login<Credential>("login", credential);
    if(response.ok){
      return response.data;
    } else {
      return response.error;
    }
  }
}