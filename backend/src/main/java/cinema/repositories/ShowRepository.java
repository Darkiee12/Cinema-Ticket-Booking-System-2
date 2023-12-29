package cinema.repositories;

import cinema.entities.Show;
import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShowRepository extends JpaRepository<Show, Long> {
        Show findByShowId(Long showId);

        List<Show> findAll();

        <S extends Show> S save(Show show);

        void delete(Show show);

        void deleteByShowId(Long showId);

        List<Show> findByMovieImdbIdAndDate(String imdbId, Date date);

        @Query("SELECT s.showId, s.movie.imdbId, s.movie.title, s.startTime, s.endTime, a.auditoriumId AS auditoriumId, a.name AS auditoriumName, c.cinemaId AS cinemaId ,c.name AS cinemaName "
                        +
                        "FROM Show s " +
                        "JOIN s.movie m " +
                        "JOIN s.auditorium a " +
                        "JOIN a.cinema c " +
                        "WHERE s.date = :date AND m.imdbId = :imdbId")
        List<Object[]> findShowsByDateAndImdbId(Date date, String imdbId);

        @Query("SELECT s FROM Show s JOIN FETCH s.auditorium a JOIN FETCH s.movie m " +
                        "WHERE m.imdbId = :imdbId AND s.date = :date AND s.startTime = :startTime AND a.auditoriumId = :auditoriumId")
        Optional<Show> findDuplicateShow(
                        @Param("imdbId") String imdbId,
                        @Param("date") Date date,
                        @Param("startTime") Time startTime,
                        @Param("auditoriumId") Long auditoriumId);

}
