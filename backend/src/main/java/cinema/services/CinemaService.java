package cinema.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cinema.entities.Auditorium;
import cinema.entities.Cinema;
import cinema.repositories.CinemaRepository;

import java.sql.Date;
import java.util.List;

@Service
public class CinemaService {
    private final int capacity = 100;
    @Autowired
    CinemaRepository cinemaRepository;

    public CinemaService() {
    }

    public List<Cinema> getCinemas() {
        return cinemaRepository.findAll();
    }

    public Cinema getCinemaById(Long cinemaId) {
        return cinemaRepository.findByCinemaId(cinemaId);
    }

    public Cinema getCinemaByName(String name) {
        return cinemaRepository.findByName(name);
    }

    public Cinema saveCinema(Cinema cinema) {
        return cinemaRepository.save(cinema);
    }

    public void deleteCinemaById(Long cinemaId) {
        cinemaRepository.deleteByCinemaId(cinemaId);
    }

    public List<Cinema> findCinemaByImdbIdAndDate(String imdbId, Date date) {
        return cinemaRepository.findCinemaByImdbIdAndDate(imdbId, date);
    }

}
