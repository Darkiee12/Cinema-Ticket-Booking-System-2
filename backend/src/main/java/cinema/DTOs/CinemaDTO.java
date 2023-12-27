package cinema.DTOs;

import java.util.List;

public record CinemaDTO(
    Long cinemaId,
    String cinemaName,
    List<ShowDTO> shows) {
}