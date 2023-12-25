package cinema.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cinema.entities.Show;
import cinema.entities.Ticket;
import cinema.entities.TicketStatus;
import cinema.entities.User;
import cinema.repositories.ShowRepository;
import cinema.repositories.TicketRepository;
import cinema.repositories.UserRepository;

import java.util.List;

@Service
public class TicketService {
    @Autowired
    TicketRepository ticketRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ShowRepository showRepository;

    public TicketService() {
    }

    public List<Ticket> getTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long ticketId) {
        return ticketRepository.findByTicketId(ticketId);
    }

    public void deleteTicketById(Long ticketId) {
        ticketRepository.deleteByTicketId(ticketId);
    }

    public Ticket addTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    // public Ticket addTicket(Ticket ticketRequest) {
    // User user = userRepository.findByUserId(ticketRequest.userId);
    // Show show = showRepository.findByShowId(ticketRequest.showId);
    // Ticket ticket = new Ticket();
    // ticket.setStatus(TicketStatus.CONFIRMED);
    // ticket.setTimestamp(ticketRequest.timestamp);
    // ticket.setNumberOfSeats(ticketRequest.seats);
    // ticket.setUser(user);
    // ticket.setShow(show);
    // return ticketRepository.save(ticket);
    // }
}
