package cinema.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import com.fasterxml.jackson.annotation.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "movies")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "imdbId")
public class Movie {

        @Id
        @Column(name = "imdb_id", unique = true, length = 20)
        private String imdbId;

        @Column(name = "tmdb_id", unique = true)
        private int tmdbId;

        @Column(name = "title", length = 255)
        private String title;

        @Column(name = "original_title", length = 255)
        private String originalTitle;

        @Column(name = "year")
        private Integer year;

        @Column(name = "rated", length = 50)
        private String rated;

        @Column(name = "released")
        private String released;

        @Column(name = "runtime")
        private Integer runtime;

        @Column(name = "plot", columnDefinition = "TEXT")
        private String plot;

        @Column(name = "awards", length = 255)
        private String awards;

        @Column(name = "poster", columnDefinition = "TEXT")
        private String poster;

        @Column(name = "tagline", length = 255)
        private String tagline;

        @Column(name = "metascore")
        private Integer metascore;

        @Column(name = "imdb_rating")
        private Double imdbRating;

        @Column(name = "imdb_votes")
        private Integer imdbVotes;

        @Column(name = "type", length = 50)
        private String type;

        @Column(name = "dvd")
        private String dvd;

        @Column(name = "box_office")
        private Double boxOffice;

        @Column(name = "production", length = 255)
        private String production;

        @Column(name = "website", length = 255, columnDefinition = "character varying(255) default 'N/A'")
        private String website;

        @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        @JoinTable(name = "cast_member", joinColumns = @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id"), inverseJoinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"))
        // @JsonManagedReference
        @JsonIgnoreProperties("movies")
        private List<Person> cast;

        @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        @JoinTable(name = "movies_countries", joinColumns = @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id"), inverseJoinColumns = @JoinColumn(name = "iso_3166_1", referencedColumnName = "iso_3166_1"))
        // @JsonManagedReference
        @JsonIgnoreProperties("movies")
        private List<Country> countries;

        @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        @JoinTable(name = "movies_genres", joinColumns = @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id"), inverseJoinColumns = @JoinColumn(name = "genre_id", referencedColumnName = "id"))
        // @JsonManagedReference
        @JsonIgnoreProperties("movies")
        private List<Genre> genres;

        @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        @JoinTable(name = "movies_languages", joinColumns = @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id"), inverseJoinColumns = @JoinColumn(name = "iso_639_1", referencedColumnName = "iso_639_1"))
        // @JsonManagedReference
        @JsonIgnoreProperties("movies")
        private List<Language> languages;

        @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        @JoinTable(name = "movies_companies", // Rename the table to avoid conflicts
                        joinColumns = @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id"), inverseJoinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"))

        @JsonIgnoreProperties("movies")
        private List<Company> companies; // Update the property name to reflect the relationship

        @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        @JoinTable(name = "movies_ratings", joinColumns = @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id"), inverseJoinColumns = @JoinColumn(name = "writer_id", referencedColumnName = "id"))
        @JsonIgnoreProperties("movies")
        private List<Rating> ratings;

        @JsonIgnore
        @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id")
        @JsonIgnoreProperties("movie")
        private List<Show> shows;

        @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id")
        @JsonIgnoreProperties("movie")
        private List<Comment> comments;
}
