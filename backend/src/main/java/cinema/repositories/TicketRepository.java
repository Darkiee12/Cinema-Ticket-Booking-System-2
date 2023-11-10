package cinema.repositories;

import cinema.entities.Ticket;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long>{
    Ticket findByTicketId(Long ticketId);
    List<Ticket> findAll();
    Ticket save(Ticket ticket);
    void delete(Ticket ticket);
    void deleteByTicketId(Long ticketId);
}
