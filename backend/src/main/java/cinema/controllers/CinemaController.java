package cinema.controllers;

import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cinema.entities.Cinema;
import cinema.services.CinemaService;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CinemaController {
    @Autowired
    CinemaService cinemaService;

    @GetMapping("/cinemas")
    public List<Cinema> getCinemas() {
        return cinemaService.getCinemas();
    }

    @GetMapping("cinemas/get-cinema")
    public Cinema getCinema(String name) {
        return cinemaService.getCinemaByName(name);
    }

    @PostMapping("cinemas/add-cinema")
    public Cinema addMovie(@RequestBody Cinema cinema) {
        return cinemaService.saveCinema(cinema);
    }

    @GetMapping("cinemas/{imdbId}/{date}")
    public ResponseEntity<List<Cinema>> findCinemaByImdbIdAndDate(@PathVariable String imdbId,
            @PathVariable String date) {
        List<Cinema> cinemas = cinemaService.findCinemaByImdbIdAndDate(imdbId, Date.valueOf(date));
        if (cinemas.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(cinemas);
        }
    }

}
