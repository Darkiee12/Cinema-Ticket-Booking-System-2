package cinema.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "auditorium_seats")
@Getter
@Setter
public class AuditoriumSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auditorium_seat_id")
    private Long auditoriumSeatId;

    @Column(name = "seat_number")
    private Integer seatNumber;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "type")
    private SeatType type;

    @JsonIgnore
    @JsonIgnoreProperties("auditoriumSeats") //
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "auditorium_id", referencedColumnName = "auditorium_id")
    private Auditorium auditorium;

    @JsonIgnoreProperties("auditoriumSeat") //
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "auditorium_seat_id", referencedColumnName = "auditorium_seat_id")
    private List<ShowSeat> showSeats = new ArrayList<>();
}
