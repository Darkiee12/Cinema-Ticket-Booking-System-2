package cinema.repositories;

import cinema.entities.Show;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowRepository extends JpaRepository<Show, String>{
    Show findByShowId(Long showId);
    List<Show> findAll();
    Show save(Show show);
    void delete(Show show);
    void deleteByShowId(Long showId);
}
