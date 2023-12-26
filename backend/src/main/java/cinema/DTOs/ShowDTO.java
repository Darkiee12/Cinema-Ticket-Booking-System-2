package cinema.DTOs;

import java.sql.Date;
import java.sql.Time;

public record ShowDTO(
    Long showId,
    String imdbId,
    String title,
    Long auditoriumId,
    String auditoriumName,
    Long cinemaId,
    String cinemaName,
    Time startTime,
    Time endTime,
    Date date

) {

}
