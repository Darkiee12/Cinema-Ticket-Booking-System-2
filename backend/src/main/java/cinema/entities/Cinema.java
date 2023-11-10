package cinema.entities;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cinemas")
@Getter
@Setter
public class Cinema {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cinema_id")
    private Long cinemaId;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "auditoriums")
    private Integer auditoriums;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "phone_number")
    private Long phoneNumber;

    @Column(name = "email", length = 255)
    private String email;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "cinema_id", referencedColumnName = "cinema_id")
    private Set<Auditorium> auditoriumLists;
}
