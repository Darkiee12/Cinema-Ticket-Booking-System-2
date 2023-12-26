package cinema.DTOs;

import java.sql.Date;
import java.sql.Time;

public record ShowDTO(
        Long showId,
        String imdbId,
        String title,
        String auditoriumName,
        String cinemaName,
        Time starTime,
        Time endTime,
        Date date

) {

}
