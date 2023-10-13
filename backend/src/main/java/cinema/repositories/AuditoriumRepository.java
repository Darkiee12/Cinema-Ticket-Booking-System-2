package cinema.repositories;

import cinema.entities.Auditorium;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditoriumRepository extends JpaRepository<Auditorium, String> {
    Auditorium findByAuditoriumId(Long auditoriumId);
    List<Auditorium> findAll();
    Auditorium save(Auditorium auditorium);
    void deleteByAuditoriumId(Long auditoriumId);
}
