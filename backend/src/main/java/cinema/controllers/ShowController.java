package cinema.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import cinema.services.ShowService;
import cinema.DTOs.ShowDTO;
import cinema.entities.Show;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ShowController {
    @Autowired
    ShowService showService;

    @GetMapping("/shows/get-all")
    public ResponseEntity<List<Show>> getShows() {
        List<Show> show = showService.getShows();
        return ResponseEntity.ok().body(show);
    }

    @GetMapping("/shows/{imdbId}")
    public ResponseEntity<List<ShowDTO>> getShowsByImdbId(@PathVariable String imdbId) {
        List<ShowDTO> show = showService.getShowsByImdbId(imdbId);
        return ResponseEntity.ok().body(show);
    }

    @PostMapping("/shows/add-show")
    public ResponseEntity<Show> addShow(@RequestBody Show show) {
        if (showService.getShowById(show.getShowId()) != null) {
            return ResponseEntity.badRequest().build();
        } else {
            showService.saveShow(show);
            return ResponseEntity.ok().build();
        }
    }
}
