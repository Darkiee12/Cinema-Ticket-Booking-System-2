package cinema.entities;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "cinemas")
@Getter
@Setter
public class Cinema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cinema_id")
    private Long cinemaId;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "phone_number")
    private Long phoneNumber;

    @Column(name = "email", length = 255)
    private String email;

    @JsonIgnoreProperties("cinema")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "cinema_id", referencedColumnName = "cinema_id")
    private List<Auditorium> auditoriums = new ArrayList<>();

    @PostPersist
    private void initalizeAuditoriums() {
        for (int i = 0; i < capacity; i++) {
            Auditorium auditorium = new Auditorium();
            auditorium.setCinema(this);
            auditorium.setSeats(100);
            auditorium.setName("Auditorium " + (i + 1));
            auditoriums.add(auditorium);
        }
    }
}
