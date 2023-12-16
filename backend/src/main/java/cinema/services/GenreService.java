package cinema.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cinema.entities.Genre;
import cinema.repositories.GenreRepository;

@Service
public class GenreService {

    @Autowired
    private GenreRepository genreRepository;

    public Genre getGenreByCode(int genreCode) {
        return genreRepository.findById(genreCode);
    }

    public Genre saveGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public List<Genre> getAllGenres() {
      return genreRepository.findAll();
    }
}