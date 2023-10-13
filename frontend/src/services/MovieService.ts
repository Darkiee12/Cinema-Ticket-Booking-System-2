import axios from 'axios';
import Movie from '../models/Movie';
const MOVIE_API = 'http://localhost:8080/movies';

class MovieService {
  public async getMovies(): Promise<Movie[]> {
    try {
      const response = await axios.get(MOVIE_API);
      const movies = response.data as Movie[];
      return movies;
    } catch (error) {
      // Handle errors here
      throw error;
    }
  }
}
export default new MovieService();
