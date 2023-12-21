package cinema.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import cinema.entities.AuditoriumSeat;
import cinema.services.AuditoriumSeatService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class AuditoriumSeatController {
    @Autowired AuditoriumSeatService auditoriumSeatService;
    @PostMapping("/auditorium-seat")
    public AuditoriumSeat addAuditorium(@RequestBody AuditoriumSeat auditoriumSeat) {
        return auditoriumSeatService.saveAuditoriumSeat(auditoriumSeat);
    }
}
