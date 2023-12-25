package cinema.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cinema.utilities.ExtendTime;
import cinema.entities.Auditorium;
import cinema.entities.Movie;
import cinema.entities.Show;
import cinema.repositories.AuditoriumRepository;
import cinema.repositories.MovieRepository;
import cinema.repositories.ShowRepository;

import java.util.List;

@Service
public class ShowService {
    @Autowired
    ShowRepository showRepository;
    @Autowired
    MovieRepository movieRepository;
    @Autowired
    AuditoriumRepository auditoriumRepository;

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

}
