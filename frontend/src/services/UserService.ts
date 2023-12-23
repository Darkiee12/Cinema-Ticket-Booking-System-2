import axios from "axios";
import User from "../models/User";
import ApiCollector from "../utils/api";
const GET_USER_ENDPOINT = "http://localhost:8080/users/get-all";

export default class UserService {
  private static api = new ApiCollector<User>("http://localhost:8080/users/");
  public static async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get(GET_USER_ENDPOINT);
      const users = response.data as User[];
      return users;
    } catch (error) {
      // Handle errors here
      throw error;
    }
  }

  public static async addUser(user: User): Promise<> {
    const res = this.api.post("signup", user);

    try {
      await axios.post(ADD_USER_ENDPOINT, user);
      return true;
    } catch (error) {
      return false;
    }
  }
}
