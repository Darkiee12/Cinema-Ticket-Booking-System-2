package cinema.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cinema.DTOs.ShowDTO;
import cinema.entities.Show;
import cinema.mappers.ShowMapper;
import cinema.repositories.AuditoriumRepository;
import cinema.repositories.MovieRepository;
import cinema.repositories.ShowRepository;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShowService {
    @Autowired
    ShowRepository showRepository;
    @Autowired
    MovieRepository movieRepository;
    @Autowired
    AuditoriumRepository auditoriumRepository;
    @Autowired
    private ShowMapper showMapper;

    public ShowService() {

    }

    public List<Show> getShows() {
        return showRepository.findAll();
    }

    public Show getShowById(Long showId) {
        return showRepository.findByShowId(showId);
    }

    public Show saveShow(Show show) {
        return showRepository.save(show);
    }

    public void deleteShowById(Long showId) {
        showRepository.deleteByShowId(showId);
    }

    public List<ShowDTO> getShowsByImdbIdAndDate(String imdbId, Date date) {
        return showRepository
                .findByMovieImdbIdAndDate(imdbId, date)
                .stream()
                .map(showMapper)
                .collect(Collectors.toList());

    }

    public List<Object[]> findShowsByDateAndImdbId(Date date, String imdbId) {
        return showRepository.findShowsByDateAndImdbId(date, imdbId);
    }

}
