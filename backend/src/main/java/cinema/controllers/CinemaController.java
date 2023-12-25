package cinema.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cinema.entities.Cinema;
import cinema.services.CinemaService;

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
}
