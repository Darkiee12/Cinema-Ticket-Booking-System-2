package cinema.repositories;

import cinema.entities.Auditorium;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AuditoriumRepository extends JpaRepository<Auditorium, Long> {
    Auditorium findByAuditoriumId(Long auditoriumId);

    List<Auditorium> findAll();

    <S extends Auditorium> S save(Auditorium auditorium);

    void deleteByAuditoriumId(Long auditoriumId);
}
