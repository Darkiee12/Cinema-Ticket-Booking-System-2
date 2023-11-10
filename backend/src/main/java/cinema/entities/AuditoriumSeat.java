package cinema.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "auditorium_seats")
@Getter
@Setter
public class AuditoriumSeat {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auditorium_seat_id")
    private Long auditoriumSeatId;

    @Column(name = "seat_number")
    private Integer seatNumber;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "type")
    private SeatType type;

    @ManyToOne
    @JoinColumn(name = "auditorium_id", referencedColumnName = "auditorium_id")
    private Auditorium auditorium;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "auditorium_seat_id", referencedColumnName = "auditorium_seat_id")
    private Set<ShowSeat> showSeats;
}
