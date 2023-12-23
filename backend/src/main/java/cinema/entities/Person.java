package cinema.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Entity
@Getter
@Setter
@Table(name = "people")
public class Person {
    @JsonIgnore
    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "role")
    private String role;

    @ManyToMany(mappedBy = "cast", fetch = FetchType.LAZY)
    //@JsonBackReference
    @JsonIgnoreProperties("cast")
    private List<Movie> movies;

    
}
