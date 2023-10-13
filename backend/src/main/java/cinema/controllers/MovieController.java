package cinema.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import cinema.entities.Movie;
import cinema.services.MovieService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class MovieController {
    @Autowired MovieService movieService;

    @GetMapping("/movies")
    public List<Movie> getMovies(){
        return movieService.getMovies();
    }

    @GetMapping("/get-movie")
    public Movie getMovie(String title){
        return movieService.getMovie(title);
    }

    @PostMapping("/movies")
    public Movie addMovie(Movie movie) {
        return movieService.saveMovie(movie);
    }
}
