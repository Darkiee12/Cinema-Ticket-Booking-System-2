package cinema.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import cinema.entities.Movie;
import cinema.services.MovieService;


@CrossOrigin(origins="http://localhost:3000")
@RestController
public class AdminController {
    @Autowired MovieService movieService;

    @PostMapping("/admin")
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.saveMovie(movie);
    }
}
