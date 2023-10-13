import {useState, FormEvent} from 'react';
import axios from 'axios';
import { MovieOMDB } from '../models/MovieOMDB';
import defaultMoviePoster from "../assets/movie_default.jpg";
const API_KEY = "4812f791";

export default function AddMovieComponent(){
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [movie, setMovie] = useState<Partial<MovieOMDB>>({
    Poster: defaultMoviePoster,
  });
  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?t=${searchTerm}&apikey=${API_KEY}`
      );

      if (response.data.Error) {
        // Handle error here, e.g., show a message to the user.
        console.error(response.data.Error);
      } else {
        const movie = response.data;
        console.log("Movie: ", movie);
        setMovie(movie);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div className="movie-inserting-page">
      <div className="App-header">
        <h1>Adding more movies...</h1>
      </div>
      <form onSubmit={handleSearch} className="search-container">
        <input
          className="search-bar"
          type="search"
          placeholder="Enter a movie title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>
      {movie && (
        <div className="movie-card">
          <div className="movie-poster-container">
            <img src={movie?movie.Poster:defaultMoviePoster} className="movie-poster" alt="Movie Poster" />
          </div>
          <div className="movie-info">
            <div className="movie-title">
              <p><b>{movie.Title}</b></p>
            </div>
            <p>Genre: {movie.Genre}</p>
            <p>Duration: {movie.Runtime}</p>
            <p>Director: {movie.Director}</p>
            <p>Feature actors: {movie.Actors}</p>
            <p>Language: {movie.Language}</p>
            <p>Released: {movie.Released}</p>
            <p>Plot: {movie.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
};