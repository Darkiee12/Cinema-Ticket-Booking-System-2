package cinema.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cinema.entities.Movie;
import cinema.repositories.MovieRepository;

@Service
public class MovieService {
    @Autowired MovieRepository movieRepository;
    public MovieService(){}

    public List<Movie> getMovies(){
        return movieRepository.findAll();
    }

    public Movie getMovieFromTitle(String title) {
      return movieRepository.findByTitle(title);
    }

    public Movie getMovieFromIMDB(String imdb) {
      return movieRepository.findByImdbId(imdb);
    }

    public Movie saveMovie(Movie movie) {
      return movieRepository.save(movie);
    }
}

    
