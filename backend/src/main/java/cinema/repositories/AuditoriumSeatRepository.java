package cinema.repositories;

import cinema.entities.AuditoriumSeat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditoriumSeatRepository extends JpaRepository<AuditoriumSeat, String> {
    AuditoriumSeat findByAuditoriumSeatId(Long auditoriumSeatId);
    List<AuditoriumSeat> findAll();
    AuditoriumSeat save(AuditoriumSeat auditoriumSeat);
    void delete(AuditoriumSeat auditoriumSeat);
    void deleteByAuditoriumSeatId(Long auditoriumSeatId);
}
