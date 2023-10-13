package cinema.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cinema.entities.Auditorium;
import cinema.pojos.AuditoriumRequest;
import cinema.services.AuditoriumService;

@RestController
public class AuditoriumController {
    @Autowired AuditoriumService auditoriumService;

    @GetMapping("/auditoriums")
    public List<Auditorium> getAuditoriums(){
        return auditoriumService.getAuditoriums();
    }

    @PostMapping("/auditoriums")
    public Auditorium addAuditorium(@RequestBody AuditoriumRequest auditoriumRequest) {
        return auditoriumService.addAuditorium(auditoriumRequest);
    }
}
