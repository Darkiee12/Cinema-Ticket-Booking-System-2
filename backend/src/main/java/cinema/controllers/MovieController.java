package cinema.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import cinema.entities.Movie;
import cinema.services.MovieService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MovieController {
    @Autowired
    private MovieService movieService;
    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/movies/get-all")
    public List<Movie> getMovies() {
        return movieService.getMovies();
    }

    @GetMapping("/movies/get-title/{title}")
    public Movie getMovieFromTitle(@PathVariable String title) {
        return movieService.getMovieFromTitle(title);
    }

    @GetMapping("/movies/get-imdb")
    public Movie getMovieFromIMDB(String imdb) {
        return movieService.getMovieFromIMDB(imdb);
    }

    @PostMapping(value = "/movies/add-movie", consumes = "application/json", produces = "application/json")
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.saveMovie(movie);
    }

    @GetMapping("/movies/sql/{query}")
    public List<Movie> executeSql(@PathVariable String query) throws UnsupportedEncodingException {
        String decodedUri = URLDecoder.decode(query, StandardCharsets.UTF_8.toString());
        return entityManager.createNativeQuery(decodedUri, Movie.class).getResultList();
    }
}
