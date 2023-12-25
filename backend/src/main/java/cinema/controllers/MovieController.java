package cinema.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<List<Movie>> getMovies() {
        List<Movie> movies = movieService.getMovies();
        return ResponseEntity.ok().body(movies);
    }

    @GetMapping("/movies/get-title/{title}")
    public ResponseEntity<List<Movie>> getMovieFromTitle(@PathVariable String title) {
        List<Movie> movie = movieService.getMovieFromTitle(title);
        return ResponseEntity.ok().body(movie);
    }

    @GetMapping("/movies/get-imdb/{imdb}")
    public ResponseEntity<Movie> getMovieFromIMDB(@PathVariable String imdb) {
        Movie movie = movieService.getMovieFromIMDB(imdb);
        return ResponseEntity.ok().body(movie);
    }

    @PostMapping("/movies/add-movie")
    public ResponseEntity<Object> addMovie(@RequestBody Movie movie) {
        if (movieService.getMovieFromIMDB(movie.getImdbId()) != null) {
            return ResponseEntity.badRequest().build();
        } else {
            movieService.saveMovie(movie);
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/movies/sql/{query}")
    public ResponseEntity<Object> executeSql(@PathVariable String query) {
        try {
            String decodedUri = URLDecoder.decode(query, StandardCharsets.UTF_8.toString());
            List<Movie> movies = entityManager.createNativeQuery(decodedUri, Movie.class).getResultList();
            return ResponseEntity.ok().body(movies);
        } catch (UnsupportedEncodingException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            // Catch any other exceptions, including SQL exceptions
            String errorMessage = "Error executing SQL query: " + e.getMessage();
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }
}
