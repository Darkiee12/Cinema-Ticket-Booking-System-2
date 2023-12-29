package cinema.controllers;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import cinema.services.ShowService;
import cinema.entities.Show;
import org.springframework.web.bind.annotation.RequestParam;

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

    // @GetMapping("/shows/{imdbId}/{date}")
    // public ResponseEntity<List<ShowDTO>> getShowsByImdbIdAndDate(
    // @PathVariable String imdbId,
    // @PathVariable String date) {
    // List<ShowDTO> shows = showService.getShowsByImdbIdAndDate(imdbId,
    // Date.valueOf(date));
    // return ResponseEntity.ok().body(shows);
    // }

    @PostMapping("/shows/add-show")
    public ResponseEntity<String> addShow(@RequestBody Show show) {
        String imdbId = show.getMovie().getImdbId();
        Date date = show.getDate();
        Time startTime = show.getStartTime();
        Long auditoriumId = show.getAuditorium().getAuditoriumId();
        if (showService.findDuplicateShow(imdbId, date, startTime, auditoriumId).isPresent()) {
            return ResponseEntity.badRequest().body("Show already exists");
        } else {
            showService.saveShow(show);
            return ResponseEntity.ok().body("Show added");
        }
    }

    @PostMapping("/shows/add-shows")
    public ResponseEntity<Show> addShows(@RequestBody List<Show> shows) {
        for (Show show : shows) {
            addShow(show);
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/shows/{imdbId}/{date}")
    public ResponseEntity<List<Object[]>> findShowsByDateAndImdbId(
            @PathVariable String imdbId,
            @PathVariable String date) {

        List<Object[]> shows = showService.findShowsByDateAndImdbId(Date.valueOf(date), imdbId);

        if (shows.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(shows, HttpStatus.OK);
        }
    }

    @GetMapping("/shows/{id}")
    public ResponseEntity<Show> getShowById(@PathVariable Long id) {
        if (showService.getShowById(id) != null) {
            return ResponseEntity.ok().body(showService.getShowById(id));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
