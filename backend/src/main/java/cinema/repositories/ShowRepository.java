package cinema.repositories;

import cinema.entities.Show;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowRepository extends JpaRepository<Show, Long>{
    Show findByShowId(Long showId);
    List<Show> findAll();
    <S extends Show> S save(Show show);
    void delete(Show show);
    void deleteByShowId(Long showId);
}
