package cinema.DTOs;

import java.util.List;
import cinema.entities.Genre;
import cinema.entities.Language;

public record MovieDTO(
    String imdbId,
    Integer tmdbId,
    String title,
    String poster,
    List<Genre> genre,
    List<Language> language,
    Integer runtime,
    String released) {
}
