package cinema.entities;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tickets")
@Getter
@Setter
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private Long ticketId;

    @Column(name = "number_of_seats")
    private Integer numberOfSeats;

    @Column(name = "timestamp")
    private Timestamp timestamp;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status")
    private TicketStatus status;

    @JsonIgnoreProperties("tickets")
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @JsonIgnoreProperties("tickets")
    @ManyToOne
    @JoinColumn(name = "show_id", referencedColumnName = "show_id")
    private Show show;

    @JsonIgnoreProperties("ticket")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "ticket_id")
    private List<ShowSeat> showSeats;
}
