package cinema.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cinema.entities.Country;
import cinema.services.CountryService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CountryController {

    @Autowired
    private CountryService countryService;

    @GetMapping("/countries/{countryCode}")
    public Country getCountryByCode(String countryCode) {
        return countryService.getCountryByCode(countryCode);
    }

    @GetMapping("/countries/get-all")
    public List<Country> getAllCountries(){
        return countryService.getAllCountries();
    }
    

    @PostMapping("/countries/add-country")
    public Country saveCountry(@RequestBody Country country) {
        return countryService.saveCountry(country);
    }

    // Other API endpoints as needed
}

