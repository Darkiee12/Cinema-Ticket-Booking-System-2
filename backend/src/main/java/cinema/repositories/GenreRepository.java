package cinema.repositories;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import cinema.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre, Integer>{
    Genre findById(int id);
    List<Genre> findAll();
    Genre save(Genre genre); 
}
