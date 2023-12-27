package cinema.DTOs;

import java.sql.Date;
import java.util.List;

public record ScheduleDTO(
    Date date,
    List<CinemaDTO> cinemas) {
}