package cinema.repositories;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import cinema.entities.Country;

public interface CountryRepository extends JpaRepository<Country, String> {
    Country findByIso31661(String iso31661);
    List<Country> findAll();
    Country save(Country country);
}
