package cinema.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cinema.DTOs.MovieDTO;
import cinema.entities.Movie;
import cinema.mappers.MovieMapper;
import cinema.repositories.MovieRepository;

@Service
public class MovieService {
  @Autowired
  MovieRepository movieRepository;
  @Autowired
  private MovieMapper movieMapper;

  public MovieService() {
  }

  public List<MovieDTO> getMovies() {
    return movieRepository.findAll()
        .stream()
        .map(movieMapper)
        .collect(Collectors.toList());
  }

  public List<Movie> getMovieFromTitle(String title) {
    return movieRepository.findByTitle(title);
  }

  public Movie getMovieFromIMDB(String imdb) {
    return movieRepository.findByImdbId(imdb);
  }

  public Movie saveMovie(Movie movie) {
    return movieRepository.save(movie);
  }
}
