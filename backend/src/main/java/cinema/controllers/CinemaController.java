package cinema.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import cinema.entities.Cinema;
import cinema.services.CinemaService;

@RestController
public class CinemaController {
    @Autowired CinemaService cinemaService;

    @GetMapping("/cinemas")
    public List<Cinema> getCinemas(){
        return cinemaService.getCinemas();
    }

    @GetMapping("/get-cinema")
    public Cinema getCinema(String name){
        return cinemaService.getCinemaByName(name);
    }
}
