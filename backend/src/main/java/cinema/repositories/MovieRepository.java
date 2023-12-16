package cinema.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import cinema.entities.Movie;


public interface MovieRepository extends JpaRepository<Movie, String> {

  Movie findByTitle(String title);
  Movie findByImdbId(String imdbId);
  Movie save(Movie movie);
  @Query(
  value = "?1", 
  nativeQuery = true)
  List<Movie> executeCustomQuery(String query);
}
