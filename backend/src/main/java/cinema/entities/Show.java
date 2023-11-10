package cinema.entities;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "shows")
@Getter
@Setter
public class Show {
    @JsonIgnore
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
    
    @ManyToOne
    @JoinColumn(name = "auditorium_id", referencedColumnName = "auditorium_id")
    private Auditorium auditorium;

    @ManyToOne
    @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id")
    private Movie movie;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "show_id")
    private Set<Ticket> tickets;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "show_id")
    private Set<ShowSeat> showsSeats;
}
