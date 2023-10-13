package cinema.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cinema.entities.Auditorium;
import cinema.entities.Cinema;
import cinema.pojos.AuditoriumRequest;
import cinema.repositories.AuditoriumRepository;
import cinema.repositories.CinemaRepository;

import java.util.List;

@Service
public class AuditoriumService {
    @Autowired AuditoriumRepository auditoriumRepository;
    @Autowired CinemaRepository cinemaRepository;

    public AuditoriumService() {}

    public List<Auditorium> getAuditoriums() {
        return auditoriumRepository.findAll();
    }

    public Auditorium getAuditoriumById(Long auditoriumId) {
        return auditoriumRepository.findByAuditoriumId(auditoriumId);
    }

    public void deleteAuditoriumById(Long auditoriumId) {
        auditoriumRepository.deleteByAuditoriumId(auditoriumId);
    }

    public Auditorium addAuditorium(AuditoriumRequest auditoriumRequest) {
        Cinema cinema = cinemaRepository.findByCinemaId(auditoriumRequest.cinemaId);
        Auditorium auditorium = new Auditorium();
        auditorium.setName(auditoriumRequest.name);
        auditorium.setSeats(auditoriumRequest.seats);
        auditorium.setCinema(cinema);

        return auditoriumRepository.save(auditorium);
    }
}
