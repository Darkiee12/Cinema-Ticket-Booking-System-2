package cinema.entities;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "languages")
public class Language {
    @Id
    @Column(name = "iso_639_1", unique = true, length = 2)
    private String iso6391;

    @Column(name = "english_name", length = 255)
    private String englishName;

    @Column(name = "name", length = 255)
    private String name;

    @ManyToMany(mappedBy = "languages")
    @JsonIgnoreProperties("languages")
    private List<Movie> movies;
}
