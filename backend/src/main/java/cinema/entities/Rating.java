package cinema.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "ratings")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "source", length = 255)
    private String value;

    @Column(name = "value", length = 255)
    private String source;

    @ManyToMany(mappedBy = "ratings", fetch = FetchType.LAZY)
    //@JsonBackReference
    private List<Movie> movies;
}
