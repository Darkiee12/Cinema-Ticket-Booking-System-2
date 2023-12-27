package cinema.DTOs;

import java.util.List;

public record MovieScheduleDTO(
    String title,
    String imdbId,
    List<ScheduleDTO> schedule) {
}