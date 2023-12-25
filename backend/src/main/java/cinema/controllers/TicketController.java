package cinema.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import cinema.services.TicketService;
import cinema.entities.Ticket;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TicketController {
    @Autowired
    TicketService ticketService;

    @GetMapping("/tickets")
    public List<Ticket> getTickets() {
        return ticketService.getTickets();
    }

    @PostMapping("/tickets")
    public Ticket addTicket(@RequestBody Ticket ticket) {
        return ticketService.addTicket(ticket);
    }
}
