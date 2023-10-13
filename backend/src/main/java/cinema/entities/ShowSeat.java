package cinema.entities;

import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "show_seats")
@Getter
@Setter
public class ShowSeat {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "show_seat_id")
    private Long showSeatId;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status")
    private SeatStatus status;

    @ManyToOne
    @JoinColumn(name = "show_id", referencedColumnName = "show_id")
    private Show show;

    @ManyToOne
    @JoinColumn(name = "auditorium_seat_id", referencedColumnName = "auditorium_seat_id")
    private AuditoriumSeat auditoriumSeat;

    @ManyToOne
    @JoinColumn(name = "ticket_id", referencedColumnName = "ticket_id")
    private Ticket ticket;
}
