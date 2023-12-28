package cinema.repositories;

import cinema.entities.Show;
import java.sql.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ShowRepository extends JpaRepository<Show, Long> {
    Show findByShowId(Long showId);

    List<Show> findAll();

    <S extends Show> S save(Show show);

    void delete(Show show);

    void deleteByShowId(Long showId);

    List<Show> findByMovieImdbIdAndDate(String imdbId, Date date);

    @Query("SELECT s.movie.imdbId, s.movie.title, s.startTime, s.endTime, a.auditoriumId AS auditoriumId, a.name AS auditoriumName, c.cinemaId AS cinemaId ,c.name AS cinemaName "
            +
            "FROM Show s " +
            "JOIN s.movie m " +
            "JOIN s.auditorium a " +
            "JOIN a.cinema c " +
            "WHERE s.date = :date AND m.imdbId = :imdbId")
    List<Object[]> findShowsByDateAndImdbId(Date date, String imdbId);

}
