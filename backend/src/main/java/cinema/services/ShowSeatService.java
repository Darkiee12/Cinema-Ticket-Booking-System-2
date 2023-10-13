package cinema.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cinema.entities.ShowSeat;
import cinema.repositories.AuditoriumSeatRepository;
import cinema.repositories.ShowRepository;
import cinema.repositories.ShowSeatRepository;
import cinema.repositories.TicketRepository;

import java.util.List;

@Service
public class ShowSeatService {
    @Autowired ShowSeatRepository showSeatRepository;
    @Autowired AuditoriumSeatRepository auditoriumSeatRepository;
    @Autowired ShowRepository showRepository;
    @Autowired TicketRepository ticketRepository;

    public ShowSeatService() {}

    public List<ShowSeat> getShowSeats() {
        return showSeatRepository.findAll();
    }

    public ShowSeat getShowSeatById(Long showSeatId) {
        return showSeatRepository.findByShowSeatId(showSeatId);
    }

    public ShowSeat saveShowSeat(ShowSeat showSeat) {
        return showSeatRepository.save(showSeat);
    }

    public void deleteShowSeatById(Long showSeatId) {
        showSeatRepository.deleteByShowSeatId(showSeatId);
    }
}
