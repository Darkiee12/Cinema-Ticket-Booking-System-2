package cinema.entities;
import java.util.List;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "companies")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Company {
    @Id
    @Column(name = "id", unique = true)
    private int id;

    @Column(name = "logo_path", length = 255)
    private String logoPath;

    @Column(name = "name", length = 255)
    private String name;

    @ManyToMany(mappedBy = "companies", fetch = FetchType.LAZY) // Update mappedBy to match the property in Movie entity
    //@JsonBackReference
    @JsonIgnore
    private List<Movie> movies;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "companies_countries", 
            joinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "iso_3166_1", referencedColumnName = "iso_3166_1"))
    //@JsonManagedReference
    @JsonIgnoreProperties("companies")
    private List<Country> countries; 
}
