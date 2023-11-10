import axios from "axios";
import User from "../models/User";
const USER_API = "http://localhost:8080/users";

class UserService {
  public async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get(USER_API);
      const users = response.data as User[];
      return users;
    } catch (error) {
      // Handle errors here
      throw error;
    }
  }
}
export default new UserService();
