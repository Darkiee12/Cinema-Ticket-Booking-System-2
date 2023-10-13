package cinema.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cinema.entities.AuditoriumSeat;
import cinema.repositories.AuditoriumRepository;
import cinema.repositories.AuditoriumSeatRepository;

import java.util.List;

@Service
public class AuditoriumSeatService {
    @Autowired AuditoriumSeatRepository auditoriumSeatRepository;
    @Autowired AuditoriumRepository auditoriumRepository;

    public AuditoriumSeatService() {}

    public List<AuditoriumSeat> getAuditoriumSeats() {
        return auditoriumSeatRepository.findAll();
    }

    public AuditoriumSeat getAuditoriumSeatById(Long auditoriumSeatId) {
        return auditoriumSeatRepository.findByAuditoriumSeatId(auditoriumSeatId);
    }

    public AuditoriumSeat saveAuditoriumSeat(AuditoriumSeat auditoriumSeat) {
        return auditoriumSeatRepository.save(auditoriumSeat);
    }

    public void deleteByAuditoriumSeatId(Long auditoriumSeatId) {
        auditoriumSeatRepository.deleteByAuditoriumSeatId(auditoriumSeatId);
    }
}
