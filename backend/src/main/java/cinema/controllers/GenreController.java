package cinema.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import cinema.entities.Genre;
import cinema.services.GenreService;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class GenreController {

    @Autowired
    private GenreService genreService;

    // @GetMapping("/genres/{genreCode}")
    // public Genre getGenreByCode(int genreCode) {
    //     return genreService.getGenreByCode(genreCode);
    // }

    @GetMapping("/genres/get-all")
    public List<Genre> getAllGenres() {
        return genreService.getAllGenres();
    }
    

    @PostMapping("/genres/add-genre")
    public Genre saveGenre(Genre genre) {
        return genreService.saveGenre(genre);
    }

    // Other API endpoints as needed
}
