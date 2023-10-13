package cinema.services;
import java.sql.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cinema.utilities.ExtendTime;
import cinema.entities.Auditorium;
import cinema.entities.Movie;
import cinema.entities.Show;
import cinema.pojos.ShowRequest;
import cinema.repositories.AuditoriumRepository;
import cinema.repositories.MovieRepository;
import cinema.repositories.ShowRepository;

import java.util.List;

@Service
public class ShowService {
    @Autowired ShowRepository showRepository;
    @Autowired MovieRepository movieRepository;
    @Autowired AuditoriumRepository auditoriumRepository;

    public ShowService() {}

    public List<Show> getShows() {
        return showRepository.findAll();
    }

    public Show getShowById(Long showId) {
        return showRepository.findByShowId(showId);
    }

    public Show saveShow(ShowRequest showRequest) {
        Movie movie = movieRepository.findByImdbId(showRequest.imdbId);
        Auditorium auditorium = auditoriumRepository.findByAuditoriumId(showRequest.auditoriumId);
        Show show = new Show();
        show.setDate(showRequest.date);
        show.setStartTime(showRequest.startTime);
        show.setEndTime(ExtendTime.getEndTime(show.getStartTime(), movie.getRuntime()));
        show.setAuditorium(auditorium);
        show.setMovie(movie);
        return showRepository.save(show);
    }

    public void deleteShowById(Long showId) {
        showRepository.deleteByShowId(showId);
    }

}
