package cinema.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "auditoriums")
@Getter
@Setter
public class Auditorium {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auditorium_id")
    private Long auditoriumId;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "seats")
    private Integer seats;

    @JsonIgnoreProperties("auditorium")
    @ManyToOne
    @JoinColumn(name = "cinema_id", referencedColumnName = "cinema_id")
    private Cinema cinema;

    @JsonIgnoreProperties("auditorium")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "auditorium_id", referencedColumnName = "auditorium_id")
    private List<AuditoriumSeat> auditoriumSeats = new ArrayList<>();

    @JsonIgnoreProperties("auditorium")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "auditorium_id", referencedColumnName = "auditorium_id")
    private List<Show> shows;

    @PostPersist
    private void initializeSeats() {
        for (int i = 0; i < seats; i++) {
            AuditoriumSeat auditoriumSeat = new AuditoriumSeat();
            auditoriumSeat.setAuditorium(this);
            auditoriumSeat.setSeatNumber(i + 1);
            auditoriumSeat.setType(SeatType.STANDARD);
            auditoriumSeats.add(auditoriumSeat);
        }
    }
}
