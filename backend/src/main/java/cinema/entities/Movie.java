package cinema.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

@Entity
@Getter
@Setter
@Table(name = "movies")
public class Movie {

    @Id
    @Column(name = "imdb_id", unique = true, length = 20)
    private String imdbId;

    @Column(name = "title", length = 255)
    private String title;

    @Column(name = "year")
    private Integer year;

    @Column(name = "rated", length = 50)
    private String rated;

    @Column(name = "released")
    private String released;

    @Column(name = "runtime")
    private Integer runtime;

    @Column(name = "genre", length = 255)
    private String genre;

    @Column(name = "director", length = 255)
    private String director;

    @Column(name = "writer", length = 255)
    private String writer;

    @Column(name = "actors", length = 255)
    private String actors;

    @Column(name = "plot", columnDefinition = "TEXT")
    private String plot;

    @Column(name = "language", length = 100)
    private String language;

    @Column(name = "country", length = 100)
    private String country;

    @Column(name = "awards", length = 255)
    private String awards;

    @Column(name = "poster", columnDefinition = "TEXT")
    private String poster;

    @JdbcTypeCode(SqlTypes.JSON)
    private JsonNode ratings;

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

    @Column(name = "boxoffice")
    private Double boxOffice;

    @Column(name = "production", length = 255)
    private String production;

    @Column(name = "website", length = 255, columnDefinition = "character varying(255) default 'N/A'")
    private String website;

    @OneToMany
    @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id")
    private Set<Show> shows;

    @OneToMany
    @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id")
    private Set<Comment> comments;
}


class Json{
    private static ObjectMapper objectMapper = getDefaultObjectMapper();

    private static ObjectMapper getDefaultObjectMapper(){
        ObjectMapper defaultObjectMapper = new ObjectMapper();
        return defaultObjectMapper;
    }

    public static JsonNode parse(String src){
        try{
            return objectMapper.readTree(src);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}