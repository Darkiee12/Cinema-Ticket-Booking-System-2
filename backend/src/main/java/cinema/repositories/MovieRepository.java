package cinema.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

// import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import cinema.entities.Movie;

public interface MovieRepository extends JpaRepository<Movie, String> {

  List<Movie> findByTitle(String title);

  Movie findByImdbId(String imdbId);

  <S extends Movie> S save(Movie movie);

}
