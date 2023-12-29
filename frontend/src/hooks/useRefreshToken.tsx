import { useAuth } from "../context/AuthProvider";
import axios, { AxiosResponse } from "axios";

export const UserRefreshToken = (): (() => Promise<string>) => {
  const { setAuthData } = useAuth();

  const refreshToken = async (): Promise<string> => {
    try {
      const response: AxiosResponse<{ accessToken: string }> = await axios.get(
        '/refresh',
        { withCredentials: true }
      );

      setAuthData((prev) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return { ...prev, accessToken: response.data.accessToken };
      });

      return response.data.accessToken;
    } catch (error) {
      // Handle errors here
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  return refreshToken;
};
