import { useState, useEffect } from "react";
import MovieService from "../services/MovieService";
import { Movie } from "../models/Movie";

export default function ListMovieComponent(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    MovieService.getMovies().then((fetchedMovies: Movie[]) => {
      setMovies(fetchedMovies);
    });
  }, []);

  return (
    <div>
      <h2 className="text-center">movies</h2>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Duration</th>
              <th>Actors</th>
              <th>Directors</th>
              <th>Language</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.imdbId}>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.runtime}</td>
                <td>{movie.actors}</td>
                <td>{movie.director}</td>
                <td>{movie.language}</td>
                <td>{movie.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
