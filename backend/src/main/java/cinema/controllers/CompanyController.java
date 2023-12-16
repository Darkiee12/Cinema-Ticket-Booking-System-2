package cinema.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cinema.entities.Company;
import cinema.services.CompanyService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/companies/{Id}")
    public Company findById(int id) {
        return companyService.findById(id);
    }

    @GetMapping("/companies/get-all")
    public List<Company> getAllCountries(){
        return companyService.getAllCountries();
    }
    

    @PostMapping("/companies/add-company")
    public Company saveCompany(@RequestBody Company company) {
        return companyService.saveCompany(company);
    }

    // @PostMapping("/companies/add-company")
    // public List<Company> saveCompany(@RequestBody List<Company> company) {
    //     company.forEach(c -> c.setLogoPath("https://image.tmdb.org/t/p/original"+c.getLogoPath()));
    //     return companyService.saveCompany(company);
    // }

    // Other API endpoints as needed
}

