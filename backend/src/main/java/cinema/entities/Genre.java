package cinema.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "genres")
public class Genre {
    @Id
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "name", length = 255)
    private String name;

    @ManyToMany(mappedBy = "genre", fetch = FetchType.LAZY)
    //@JsonBackReference
    @JsonIgnoreProperties("genre")
    private List<Movie> movies;
}
