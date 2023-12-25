package cinema.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cinema.entities.Auditorium;
import cinema.entities.AuditoriumSeat;
import cinema.entities.Cinema;
import cinema.entities.SeatType;
import cinema.repositories.AuditoriumRepository;
import cinema.repositories.CinemaRepository;

import java.util.List;

@Service
public class AuditoriumService {
    @Autowired
    AuditoriumRepository auditoriumRepository;

    public AuditoriumService() {
    }

    public List<Auditorium> getAuditoriums() {
        return auditoriumRepository.findAll();
    }

    public Auditorium getAuditoriumById(Long auditoriumId) {
        return auditoriumRepository.findByAuditoriumId(auditoriumId);
    }

    public void deleteAuditoriumById(Long auditoriumId) {
        auditoriumRepository.deleteByAuditoriumId(auditoriumId);
    }

    public void saveAuditorium(Auditorium auditorium) {
        auditoriumRepository.save(auditorium);
    }
}
