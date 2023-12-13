package cinema.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cinema.entities.Movie;
import cinema.services.MovieService;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins="http://localhost:3000")
@RestController
public class MovieController {
    @Autowired MovieService movieService;

    @GetMapping("/movies/get-all")
    public List<Movie> getMovies(){
        return movieService.getMovies();
    }

    @GetMapping("/movies/get-title")
    public Movie getMovieFromTitle(String title){
        return movieService.getMovieFromTitle(title);
    } 

    @GetMapping("/movies/get-imdb")
    public Movie getMovieFromIMDB(String imdb){
        return movieService.getMovieFromIMDB(imdb);
    }

    @PostMapping("/movies/add-movie")
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.saveMovie(movie);
    }
}
