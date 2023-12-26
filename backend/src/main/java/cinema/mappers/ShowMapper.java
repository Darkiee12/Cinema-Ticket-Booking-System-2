package cinema.mappers;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import cinema.DTOs.ShowDTO;
import cinema.entities.Show;

@Service
public class ShowMapper implements Function<Show, ShowDTO> {
  @Override
  public ShowDTO apply(Show show) {
    return new ShowDTO(
        show.getShowId(),
        show.getMovie().getImdbId(),
        show.getMovie().getTitle(),
        show.getAuditorium().getName(),
        show.getAuditorium().getCinema().getName(),
        show.getStartTime(),
        show.getEndTime(),
        show.getDate());

  }
}
