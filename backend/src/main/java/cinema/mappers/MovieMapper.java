package cinema.mappers;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import cinema.DTOs.MovieDTO;
import cinema.entities.Movie;

@Service
public class MovieMapper implements Function<Movie, MovieDTO> {
  @Override
  public MovieDTO apply(Movie movie) {
    return new MovieDTO(
        movie.getImdbId(),
        movie.getTmdbId(),
        movie.getTitle(),
        movie.getPoster(),
        movie.getGenres(),
        movie.getLanguages(),
        movie.getRuntime(),
        movie.getReleased());
  }
}
