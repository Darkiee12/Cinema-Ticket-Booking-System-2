package cinema.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cinema.DTOs.ShowDTO;
import cinema.entities.Auditorium;
import cinema.entities.Show;
import cinema.mappers.ShowMapper;
import cinema.repositories.AuditoriumRepository;
import cinema.repositories.MovieRepository;
import cinema.repositories.ShowRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;
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
    @PersistenceContext
    private EntityManager entityManager;

    public ShowService() {

    }

    public List<Show> getShows() {
        return showRepository.findAll();
    }

    public Show getShowById(Long showId) {
        return showRepository.findByShowId(showId);
    }

    public Optional<Show> findDuplicateShow(String imdbId, Date date, Time startTime, Long auditoriumId) {
        return showRepository.findDuplicateShow(imdbId, date, startTime, auditoriumId);
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

    @Transactional
    public void saveShow(Show show) {
        long auditoriumId = show.getAuditorium().getAuditoriumId();
        Auditorium auditorium = entityManager.find(Auditorium.class, auditoriumId);
        show.setAuditorium(auditorium);
        entityManager.persist(show);
    }

    // public void saveShow(Show show) {
    // showRepository.save(show);
    // }
}
