package cinema.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cinema.entities.Country;
import cinema.repositories.CountryRepository;
import java.util.List;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public Country getCountryByCode(String countryCode) {
        return countryRepository.findByIso31661(countryCode);
    }

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public Country saveCountry(Country country) {
        return countryRepository.save(country);
    }

}