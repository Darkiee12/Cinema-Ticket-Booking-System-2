package cinema.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Getter
@Setter
@Table(name = "countries")
public class Country {
    @Id
    @Column(name = "iso_3166_1", unique = true, length = 3)
    private String iso31661;

    @Column(name = "name", length = 255)
    private String name;

    @ManyToMany(mappedBy = "countries", fetch = FetchType.LAZY)
    //@JsonBackReference
    private List<Movie> movies;

    @ManyToMany(mappedBy = "countries", fetch = FetchType.LAZY)
    //@JsonBackReference
    private List<Company> companies;
}
