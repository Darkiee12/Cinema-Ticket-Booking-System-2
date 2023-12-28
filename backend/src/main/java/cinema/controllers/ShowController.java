package cinema.controllers;

import java.sql.Date;
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
    public ResponseEntity<Show> addShow(@RequestBody Show show) {
        if (showService.getShowById(show.getShowId()) != null) {
            return ResponseEntity.badRequest().build();
        } else {
            showService.saveShow(show);
            return ResponseEntity.ok().build();
        }
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
}
