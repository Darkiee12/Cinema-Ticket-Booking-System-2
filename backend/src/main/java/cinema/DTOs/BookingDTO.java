package cinema.DTOs;

import java.util.List;
import java.sql.Date;
import java.sql.Time;

import cinema.entities.ShowSeat;

public record BookingDTO(
    Long showId,
    Date date,
    Time startTime,
    Time endTime,
    List<ShowSeat> showSeats) {
}
