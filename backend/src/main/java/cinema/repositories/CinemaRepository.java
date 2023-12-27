package cinema.repositories;

import cinema.entities.Cinema;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CinemaRepository extends JpaRepository<Cinema, Long> {
    Cinema findByCinemaId(long cinemaId);

    List<Cinema> findAll();

    <S extends Cinema> S save(Cinema cinema);

    void delete(Cinema cinema);

    void deleteByCinemaId(Long cinemaId);

    Cinema findByName(String name);

    @Query(value = "SELECT c " +
            "FROM cinemas c " +
            "JOIN auditoriums a " +
            "ON c.cinema_id = a.cinema_id " +
            "JOIN shows s " +
            "ON s.auditorium_id = a.auditorium_id " +
            "JOIN movies m " +
            "ON m.imdb_id = s.imdb_id " +
            "WHERE m.imdb_id = :imdbId AND s.date = :date", nativeQuery = true)
    List<Cinema> findCinemaByImdbIdAndDate(String imdbId, Date date);
}
