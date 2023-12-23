package cinema.repositories;
import cinema.entities.Cinema;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaRepository extends JpaRepository<Cinema, Long>{
    Cinema findByCinemaId(long cinemaId);
    List<Cinema> findAll();
    <S extends Cinema> S save(Cinema cinema);
    void delete(Cinema cinema);
    void deleteByCinemaId(Long cinemaId);
    Cinema findByName(String name);
}
