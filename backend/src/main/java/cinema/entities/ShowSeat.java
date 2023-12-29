package cinema.entities;

import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "show_seats")
@Getter
@Setter
public class ShowSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "show_seat_id")
    private Long showSeatId;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status")
    private SeatStatus status;

    @JsonIgnoreProperties("showSeats") //
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "auditorium_seat_id", referencedColumnName = "auditorium_seat_id")
    private AuditoriumSeat auditoriumSeat;

    @JsonIgnoreProperties("showSeats") //
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ticket_id", referencedColumnName = "ticket_id")
    private Ticket ticket;
}
