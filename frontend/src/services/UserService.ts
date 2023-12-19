import axios from "axios";
import User from "../models/User";
const ADD_USER_ENDPOINT = "http://localhost:8080/users/add";
const GET_USER_ENDPOINT = "http://localhost:8080/users/get";

export default class UserService {
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

  public static async addUser(user: User): Promise<boolean> {
    try {
      await axios.post(ADD_USER_ENDPOINT, user);
      return true;
    } catch (error) {
      return false;
    }
  }
}
