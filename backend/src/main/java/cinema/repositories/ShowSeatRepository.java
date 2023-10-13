package cinema.repositories;

import cinema.entities.ShowSeat;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowSeatRepository extends JpaRepository<ShowSeat, String> {
    ShowSeat findByShowSeatId(Long showSeatId);
    List<ShowSeat> findAll();
    ShowSeat save(ShowSeat showSeat);
    void delete(ShowSeat showSeat);
    void deleteByShowSeatId(Long showSeatId);
}
