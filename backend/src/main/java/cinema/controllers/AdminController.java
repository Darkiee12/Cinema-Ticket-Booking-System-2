package cinema.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import cinema.services.OMDBService;
import reactor.core.publisher.Mono;

@RestController
public class AdminController {
    OMDBService omdbService;

    @Autowired
    public void OmdbController(OMDBService omdbService) {
        this.omdbService = omdbService;
    }

    @GetMapping("/search")
    public Mono<String> searchMoviesByTitle(@RequestParam String title) {
        return omdbService.searchMoviesByTitle(title);
    }
}
