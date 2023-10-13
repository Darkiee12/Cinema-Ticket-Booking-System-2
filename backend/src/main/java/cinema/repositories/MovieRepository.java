package cinema.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import cinema.entities.Movie;

// @RepositoryRestResource
public interface MovieRepository extends JpaRepository<Movie, String> {

  Movie findByTitle(String title);
  Movie findByImdbId(String imdbId);
  
}
