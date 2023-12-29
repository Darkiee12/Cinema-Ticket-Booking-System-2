package cinema.entities;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "shows")
@Getter
@Setter
public class Show {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "show_id")
    private Long showId;

    @Column(name = "date")
    private Date date;

    @Column(name = "start_time")
    private Time startTime;

    @Column(name = "end_time")
    private Time endTime;

    @JsonIgnoreProperties("shows") //
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "auditorium_id", referencedColumnName = "auditorium_id")
    private Auditorium auditorium;

    @JsonIgnoreProperties("shows") //
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id")
    private Movie movie;

    @JsonIgnoreProperties("show") //
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "show_id")
    private List<Ticket> tickets = new ArrayList<>();

    @PostPersist
    public void postPersist() {
        for (AuditoriumSeat auditoriumSeat : auditorium.getAuditoriumSeats()) {
            ShowSeat showSeat = new ShowSeat();
            showSeat.setStatus(SeatStatus.AVAILABLE);
            showSeat.setAuditoriumSeat(auditoriumSeat);
            auditoriumSeat.getShowSeats().add(showSeat);
        }
    }
}
