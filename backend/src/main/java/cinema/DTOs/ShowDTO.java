package cinema.DTOs;

import java.sql.Date;
import java.sql.Time;

import cinema.entities.Auditorium;

public record ShowDTO(
                Long showId,
                Date date,
                Time startTime,
                Time endTime,
                Auditorium auditorium) {
}
